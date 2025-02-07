# Silent Firebase Transaction Failure

This repository demonstrates a subtle bug in Firebase Realtime Database transactions.  Under specific conditions involving security rules, a transaction can fail silently without any error messages being reported to the client.

The problem occurs when a transaction attempts to read data that is initially null due to restrictive security rules. Even if the transaction intends to *write* data (which is permitted by the rules), the initial null read from the database causes the transaction to fail without notification.

## Reproduction Steps

1. Clone this repository.
2. Configure your Firebase project.
3. Set up appropriate security rules (provided in the `security_rules.json` file) to restrict reads of the initial node.
4. Run `firebaseBug.js`. Observe that the transaction seems to execute, but no data is written to the database.   The console output will not indicate any errors. 
5. Run `firebaseBugSolution.js` (solution implemented), verifying the correct behavior.

## Solution

A robust solution includes checking the return value of the `transaction` method and handling potential errors appropriately, as well as refining the security rules to allow appropriate read access in the initial transaction step. See the `firebaseBugSolution.js` for an example implementation.