The issue stems from an unusual interaction between Firebase's Realtime Database security rules and the way data is structured.  Specifically, when attempting to update a nested object within a transaction, the transaction might fail silently if the initial read of the parent object returns null due to security rule restrictions.  The security rules might be overly restrictive, preventing the read even though the write (within the transaction) is permitted. This can lead to a situation where the application behaves as if the transaction succeeded, but no changes are actually made to the database.  Consider this scenario:

```javascript
firebase.database().ref('path/to/data').transaction(function(currentData) {
  if (currentData === null) {
    return { /* something */ }; //This will fail silently if security rules block read
  }
  // Modify currentData
  return currentData;
});
```