The solution involves carefully handling the potential null return value from the transaction and explicitly checking the `committed` property of the transaction result.  The security rules should also be reviewed to ensure they allow the initial read within the context of the intended write. Here's improved code:

```javascript
firebase.database().ref('path/to/data').transaction(function(currentData) {
  const newData = currentData || {/* default data or appropriate structure */}; // handle null case
  // Modify newData
  return newData; 
}).then(function(transactionResult) {
  if (!transactionResult.committed) {
    console.error('Firebase transaction failed:', transactionResult);
    // Handle the transaction failure appropriately, e.g., retry or notify the user
  } else {
    console.log('Transaction committed successfully:', transactionResult.snapshot.val());
  }
}).catch(function(error) {
  console.error('Transaction failed:', error);
});
```

By handling null cases and checking for commitment, the code becomes more resilient and easier to debug.  Additionally, carefully reviewing and potentially relaxing the Firebase security rules that may have been causing the silent failure is essential.