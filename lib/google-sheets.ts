import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { ContactFormData } from './validation';

export async function appendToGoogleSheet(data: ContactFormData) {
  const { name, phone, email, city, description } = data;

  // Validate environment variables
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail) {
    throw new Error('GOOGLE_SHEETS_CLIENT_EMAIL is not configured');
  }
  if (!privateKey) {
    throw new Error('GOOGLE_SHEETS_PRIVATE_KEY is not configured');
  }
  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID is not configured');
  }

  try {
    // Use JWT directly for better serverless compatibility
    const auth = new JWT({
      email: clientEmail,
      key: privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Force fresh token
    await auth.authorize();

    const sheets = google.sheets({ version: 'v4', auth });

    // Append row to spreadsheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            name,
            phone,
            email,
            city,
            description,
          ],
        ],
      },
    });

    console.log('Google Sheets append successful:', response.data.updates?.updatedRange);
    return response.data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error && typeof error === 'object' && 'response' in error
      ? JSON.stringify((error as { response?: { data?: unknown } }).response?.data)
      : '';
    console.error('Google Sheets error:', errorMessage, errorDetails);
    throw new Error(`Failed to log to Google Sheets: ${errorMessage}`);
  }
}
