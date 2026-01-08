import { google } from 'googleapis';
import { ContactFormData } from './validation';

export async function appendToGoogleSheet(data: ContactFormData) {
  const { name, phone, email, city, description } = data;

  try {
    // Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Append row to spreadsheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:F', // Adjust sheet name if needed
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            new Date().toISOString(), // Timestamp
            name,
            phone,
            email,
            city,
            description,
          ],
        ],
      },
    });

    return response.data;
  } catch (error) {
    console.error('Google Sheets error:', error);
    throw new Error('Failed to log to Google Sheets');
  }
}
