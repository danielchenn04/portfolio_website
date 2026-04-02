# **Final Submission: Security Design Report & Threat Modeling**

**Course: COSC 55**

**Professor Saydjari**

**Daniel Chen, Selena Zhou**

---

## Project Overview

WhisperChain+ is a complimentary communications application which ensures anonymity and accountability. The system is broken down into two main processes, communication and oversight. Each process has roles associated. In communications, we find the user role which is composed of sender and recipient roles. The names are self explanatory. The oversight component has the moderator and the administrator. Moderators will watch over flagged messages to ensure they are not malicious. If the message is malicious, the moderator reserves the right to delete the message. The administrator will have the ability to change user roles, rotate public keys, and set system policies. All of these roles are outlined further in the design specifications. 

We expect WhisperChain+ to be adaptive to the role of the user. Upon execution of the program, the user will be asked to log in. From there, depending on what role they are assigned, the user will have certain privileges displayed on screen. The administrator will have access to change user roles. All new users will be automatically assigned both sender and recipient roles, users must request to be moderators, and admins must approve the request.

There are certain features in the WhisperChain+ system that will be maintained. First is anonymity. This will be preserved  by hashing usernames and identifiers, ensuring that moderators and administrators are able to identify senders without knowing their identities. Second is encryption, which will be maintained by automatically encrypting sender messages and having the recipient end decrypt all messages. Third is logging, which will be maintained by the system. When actions are undertaken, the system will automatically log the actions. Last is traceability and accountability, which will be maintained through signatures to ensure non-repudiation.

## Security Design Report

When brainstorming an initial layout of our project, we came up with a unique object oriented approach. We found that this approach made the most sense, especially if we we consider the standards we wanted to achieve; namely being, Authentication and Authorization (AaA), Role-Based Access Control (RBAC), Secure Messaging (SM), Flagging and Moderation (FaM), and data storage. We will introduce each of these core functionality, what security threats they help to mitigate, how we implemented them, and our rationale in tackling these features the way that we did.

AaA helps to ensure we don’t run into the problems that we see in Appendix (c,1). AaA works to confirm that the correct privileges are provided to the correct user. First we implemented authentication through `auth.py`.  `auth.py` , upon first execution, will prompt for the user to register as an administrator with a secure password. Without registering an administrator, the application will not function. This ensures that there will be an administrator to assign roles as needed. `auth.py` then salts and stores the hashed password securely in a json file (auth.json). `auth.py` will handle user sign-ups once an administrator is selected. The program requires a name and a password from the user. From there, the passwords are salted and hashed using PBKDF2-HMAC-SHA256 and base64-encoded. Public keys and private keys are generated upon user-object creation. The private key is saved locally so private keys are decentralized. Public keys are stored server-side in a json file (userStore.json). To authenticate users, `auth.py` hashes the provided password with the stored hashed password. `controller.py` checks that these requirements have been met and returns a user-object if all requirements are met.

RBAC was utilized to ensure the principle of least privilege. We followed the scheme laid out in Appendix (a) and (b). We utilized `roles.py` to build the 3 roles for our system. We created a user role, which could be thought of as both a sender and recipient, a moderator, and an administrator. We found that the object oriented design allowed us to define these general user objects that could be tweaked to fit the needs of administrator or moderator when needed. Each user-object had certain instance variables, namely “approved” which would be turned false in the case a user was to be banned. We integrated senders and recipients to allow for blind message replying as we felt it most effective rather than navigating multiple menus to do so. Additionally, `roles.py` limited access to messages, audit logs, flagged messages through checks in the user role. If the user requested access to a resource not available for their role, access would be denied. No one role had access to all resources either, this distributed the value of each role as to not create a high value target role. 

SM helps to ensure both Appendix (c,1 and c,2). In the case of Appendix (c,1), spoofing can occur if an attacker tries to claim a sender’s identity through using their token. We implemented the `message.py` class to ensure that all messages would require a token which was used to create a signature for each message. Each signature would expire every round, ensuring that attackers could not use old tokens or signatures. SM also helps to ensure Appendix (c,2). In this case, `message.py` performs end-to-end encryption on each message. The message would be encrypted using a recipient-object’s public key and decrypted using the recipient-object’s private key upon arrival.  `message.py` also held the TokenManager class. The token manager was used to keep track of which tokens were used, and it was responsible for consuming tokens once the round was over, this helped to ensure that the correct tokens were used and removed accordingly. 

FaM was our solution to the threats posed in Appendix (c,3 and c,5). To ensure that users were unable to deny actions, we implemented an audit logging system. This system would audit key actions performed (account creation, account login, sending messages, receiving messages, audit log query, flagging messages, and unflagging messages). Audit logs were recorded with timestamps in UTC. We built the audit log to be append-only to ensure that the logs could not be rewritten. Additionally, every audit log related to a message had a message id. This message id could be used to trace the sender id, recipient id, or moderator id to ensure nonrepudiation of any audited action.  Furthermore, `message.py` held a queue of flagged messages. Each flagged message would be stored in the queue in the form of a message id. Each message would be assigned a moderator. The moderator would be treated as a recipient and the message would be sent to the moderator using end-to-end encryption for a verdict. Through this process, private keys would not be sent through the network, and moderators would still be able to read flagged messages. 

We addressed the problem of Appendix(c,5) through the moderator role. The moderator is able to use the message id of the flagged message to trace the sender id. Only the moderator and admin have access to revoking a user’s access to their account. This ensures that spam messages sent from the same sender id could be traced and removed to prevent spam messages. 

Data storage was our last pillar. Data storage was our solution to the problems addressed in Appendix (c,4). Since we wanted to maintain anonymity traceability, we store all users and messages using ids. User ids obscure the name of each user. These names are not accessible to anyone besides the system. Furthermore, only administrators are able to access the audit logs, thus, standard users (sender-recipients) and moderators are never shown user ids. Standard users input names of other users in the system to send messages. The name to id conversions are all done on the system side through use of a python dictionary.

Rationale  
The rationale behind our implementation of AaA fell hand-in-hand with our work with `password manager`. We found it best to bring over the authentication and password encryption that was used in that assignment. Additionally, we found that the object-oriented programming style is best suited to handle role based access controls. The object-oriented design lent itself very well to inter user communication. Since all roles were instances of role-objects, that meant we could treat moderators as pseudo recipients. This was helpful in sending encrypted flagged messages to moderators without needing to send private keys in the open. Additionally, the object-oriented approach meant that roles could be switched very easily in the backend if an admin chose to do so. 

Data storage, and by extension message storage, was also made simpler through the use of object-oriented programming. Since message objects held information such as the message id, ciphertext, sender id, and recipient id, this made traceability a breeze. Audit logs were also audit objects, this meant that each audit log contained an id of sorts, whether that was a user id, or a message id. As mentioned above, all message ids can be traced back to a user, this means that all audit logs could be traced to a user.

The rationale behind merging sender and recipient came down to ease of use. We wanted to implement a blind reply feature where users are able to reply to messages sent to them, while still maintaining anonymity. We found it best to merge these two roles into one. We also found it best to automatically approve these standard users, while requiring admin to approve moderators. This helps to relieve the burden on the administrator . If users flag a message before a moderator is assigned, we return that a moderator has not been assigned and for the user to try again later. This ensures that no other user id is granted moderator access before approval of the admin. 

Notes for Future Implementation  
Our current implementation of WhisperChain+ has a few vulnerabilities that require addressing. First is the high-value-target which is the name-id dictionary. Although no users, or roles for that fact, have direct access to this dictionary, it acts as a high-value-target when paired with audit logs. This would break apart the anonymity that our application strives for. Due to time constraints, as a group of two, we were unable to implement such a robust and decentralized concept. In order to provide a working demo in the time allotted, we recognize this vulnerability.

In our research, we used the standard asymmetric RSA encryption algorithm. In our research we found that the MBC python library would’ve been useful to implement zero-knowledge proofs which would decentralize encryption. Although this would help minimize vulnerabilities with centralized encryption, we felt that due to time constraints, we did not have enough time to implement these zero-knowledge proofs. We would suggest utilizing the MBC library for more security in the future. 

One last item that we want to touch on deals with message escalation. We were hoping to allow appeals for flagged messages. This would let senders appeal their flagged message/ banned account status to the admin. Once the request is received, the admin would make a verdict. We found that this idea, although would allow for more fairness in judgement, would be too extensive of a change for the given timeframe. 

Extra Credit Acknowledgements  
Throughout our project, we have added in various, what we believe to be, extra credit implementations. All items not previously mentioned, here or in the assignment description, will include a short blurb detailing our implementation. We have taken the liberty to outline these implementations in the following list:

* Group size of 2  
* Object Oriented Design  
  * We built our OOP design from the ground up to work neatly with the role based system. We found this to be the most efficient and elegant solution. You’ll notice that each of our pillars are implemented using OOP.  
* Blind signature token issuance  
* Front-end which adapts to roles  
  * User-friendly front-end using CLI
  * User-friendly audit log display where admin can scroll through logs  
* Multiple moderators  
  * To ensure the principle of least privilege, while still maintaining efficiency, we allow for multiple moderators. However, each moderator needs to be assigned flagged messages. This ensures that moderators only have access to reading and deleting messages that they are assigned, otherwise they are not provided access.  
* Dynamic Moderator Assignment  
  * We implemented two ways to store moderator assigned flagged messages: active/unresolved flagged messages, and resolved flagged messages. This means that if a moderator is faster at resolving flagged messages, their active flagged message list would be less and the system would give them priority when assigning flagged messages. On the flip side, if a moderator takes more time resolving flags, the system would hold off on assigning them more issues. This ensures that at any given moment in time, every moderator has around the same number of unresolved flagged messages assigned.  
* Blind message reply feature  
  * Allows recipients to reply to messages sent by users while still maintaining anonymity.  
* User search feature  
  * Since users can only send messages to other registered users, users are allowed to search for names of other users that exist in the database. For usability purposes, they can display a list of all active users (not moderators) so they know who they can send messages to, or search up a specific name if they want to see if someone they want to send a message to has an account in WhisperChain. We acknowledge that this may lower confidentiality if there are fewer active users, however we made this design choice because we think that usability and availability is more important and it still keeps the main function of messaging anonymous.

  ---

## Appendix

# 1) **RBAC Table**

| Role | Resources | Read | Write | Delete |
| :---- | :---- | :---- | :---- | :---- |
| Sender | Sender created messages | ✔️ | ✔️ | ❌ |
| Recipient | Recipient directed messages | ✔️ | ❌ | ❌ |
| Moderator | Flagged messages | ✔️ | ❌ | ✔️ |
| Admin | Audit logs | ✔️ | ❌ | ❌ |

# 2) **Role-permission Matrix**

| Action | Sender | Recipient | Moderator | Admin |
| :---- | :---- | :---- | :---- | :---- |
| Send encrypted messages | ✔️ | ❌ | ❌ | ❌ |
| Receive and decrypt messages | ❌ | ✔️ | ✔️* only when a flagged message is assigned  | ❌ |
| Flag message | ❌ | ✔️ | ❌ | ❌ |
| View assigned flagged messages | ❌ | ❌ | ✔️ | ❌ |
| View audit logs | ❌ | ❌ | ❌ | ✔️ |
| Manage user registration | ❌ | ❌ | ❌ | ✔️*  moderators need approval |
| Manage user roles | ❌ | ❌ | ❌ | ✔️ |

#   **(c) Threat Model**

| STRID Model | Property | Possible Threats | Mitigation |
| :---- | :---- | :---- | :---- |
| Spoofing | Authenticity | • User pretends to be another role (e.g. moderator sends a message as a student) | • We implemented cryptographic proofs such as tokens and signatures between every message round |
| Tampering | Integrity | • Message is altered by someone other than sender before delivery • A moderator deletes logs of a message being sent out (moderator abuse) | • E2E encryption (sender encrypts with recipient’s public key) • Immutable audit logs (append-only) |
| Repudiation | Non- repudiation | • A moderator denies flagging a message • Recipient receives abusive message, senders deny sending | • Stored in audit logs • Anonymous but verifiable sender and recipient ids |
| Information Disclosure | Confidentiality | • Sender identity is leaked  | • User identity is never stored alongside user ids. • No roles have access to name-id dictionary |
| Denial of Service | Availability | • Message flooding where a malicious users sends many messages in a round to spam or break the anonymity | • One message per round enforced with blind tokens • Allows moderators to block users when spam occurs |