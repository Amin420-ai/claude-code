/**
 * OpsOS <-> Google Sheets backend (Google Apps Script web app).
 *
 * Setup: see ../README.md. The shared secret lives in Script Properties
 * (key: OPSOS_TOKEN), never in this file.
 *
 * Protocol: the browser POSTs a JSON string (Content-Type text/plain, which
 * avoids a CORS preflight) with { token, action: 'push' | 'pull', data? }.
 */

var TABLES = {
  staff:      ['id', 'name', 'role', 'salary', 'phone', 'shift'],
  expenses:   ['id', 'date', 'desc', 'cat', 'amount'],
  sales:      ['id', 'date', 'amount', 'note'],
  attendance: ['id', 'staffName', 'role', 'type', 'ts', 'status'],
  leads:      ['id', 'name', 'phone', 'service', 'status']
};
var NUMERIC = { salary: 1, amount: 1 };

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var req = JSON.parse(e.postData.contents);
    var expected = PropertiesService.getScriptProperties().getProperty('OPSOS_TOKEN');
    if (!expected || req.token !== expected) return out({ ok: false, error: 'Token tidak sah' });

    if (req.action === 'push') {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      Object.keys(TABLES).forEach(function (name) {
        writeTable(ss, name, TABLES[name], (req.data && req.data[name]) || []);
      });
      writeMeta(ss, (req.data && req.data.meta) || {});
      return out({ ok: true });
    }
    if (req.action === 'pull') {
      var ss2 = SpreadsheetApp.getActiveSpreadsheet();
      var data = {};
      Object.keys(TABLES).forEach(function (name) {
        data[name] = readTable(ss2, name, TABLES[name]);
      });
      data.meta = readMeta(ss2);
      return out({ ok: true, data: data });
    }
    return out({ ok: false, error: 'Tindakan tidak dikenali' });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function sheet(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function writeTable(ss, name, cols, rows) {
  var sh = sheet(ss, name);
  sh.clearContents();
  var values = [cols].concat(rows.map(function (r) {
    return cols.map(function (c) { return r[c] === undefined || r[c] === null ? '' : r[c]; });
  }));
  var range = sh.getRange(1, 1, values.length, cols.length);
  // Text format first so ids, dates and phone numbers (leading 0) are not coerced.
  range.setNumberFormat('@');
  range.setValues(values);
  cols.forEach(function (c, i) {
    if (NUMERIC[c] && values.length > 1) {
      sh.getRange(2, i + 1, values.length - 1, 1).setNumberFormat('0.00').setValues(
        values.slice(1).map(function (v) { return [Number(v[i]) || 0]; })
      );
    }
  });
  sh.setFrozenRows(1);
}

function readTable(ss, name, cols) {
  var sh = ss.getSheetByName(name);
  if (!sh || sh.getLastRow() < 2) return [];
  var values = sh.getRange(2, 1, sh.getLastRow() - 1, cols.length).getValues();
  return values
    .filter(function (v) { return String(v[0]) !== ''; })
    .map(function (v) {
      var o = {};
      cols.forEach(function (c, i) { o[c] = NUMERIC[c] ? Number(v[i]) || 0 : String(v[i]); });
      return o;
    });
}

function writeMeta(ss, meta) {
  var sh = sheet(ss, 'meta');
  sh.clearContents();
  var rows = [['key', 'value']].concat(Object.keys(meta).map(function (k) { return [k, meta[k]]; }));
  sh.getRange(1, 1, rows.length, 2).setValues(rows);
}

function readMeta(ss) {
  var sh = ss.getSheetByName('meta');
  var meta = {};
  if (!sh || sh.getLastRow() < 2) return meta;
  sh.getRange(2, 1, sh.getLastRow() - 1, 2).getValues().forEach(function (r) { meta[r[0]] = r[1]; });
  return meta;
}
