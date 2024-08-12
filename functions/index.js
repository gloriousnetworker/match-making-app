const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.checkAdminStatus = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    
    const uid = data.uid;
    const userRecord = await admin.auth().getUser(uid);
    const isAdmin = userRecord.customClaims && userRecord.customClaims.admin === true;

    return { isAdmin };
  } catch (error) {
    console.error('Error checking admin status:', error);
    throw new functions.https.HttpsError('Annoying', 'Unable to check admin status');
  }
});

exports.setAdminRole = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const email = data.email;
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    return { message: 'Admin role granted successfully' };
  } catch (error) {
    console.error('Error setting admin role:', error);
    throw new functions.https.HttpsError('internal', 'Unable to set admin role');
  }
});
