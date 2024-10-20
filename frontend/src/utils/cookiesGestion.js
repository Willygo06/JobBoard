// Certainement deprecated, keeping for safe measures

function clearUuidCookie() {
  document.cookie = "uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function clearTokenCookie() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

module.exports = { clearUuidCookie, clearTokenCookie };
