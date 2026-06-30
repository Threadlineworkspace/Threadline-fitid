export const baseEmail = ({ title, fitId, content }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Threadline FitID: ${fitId || ''}</title>
  <style>
    /* Reset styles */
    body, html {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #f6f6f6;
      color: #333;
      line-height: 1.6;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      padding: 40px 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 2px solid #f0f0f0;
      margin-bottom: 30px;
    }
    
    .logo {
      max-width: 180px;
      height: auto;
    }
    
    .fitid-badge {
      display: inline-block;
      background: #323352;
      color: #ffffff;
      font-size: 24px;
      font-weight: bold;
      padding: 8px 24px;
      border-radius: 4px;
      letter-spacing: 1px;
      margin: 10px 0;
    }
    
    .section {
      margin-bottom: 30px;
    }
    
    .section-title {
      font-size: 16px;
      font-weight: bold;
      color: #323352;
      margin-bottom: 12px;
      letter-spacing: 0.5px;
    }
    
    .highlight-box {
      background: #f8f7f4;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    
    .list {
      padding-left: 20px;
      margin: 10px 0;
    }
    
    .list li {
      margin-bottom: 8px;
    }
    
    .link {
      color: #C76A32;
      text-decoration: underline;
    }
    
    .signature {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }
    
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      text-align: center;
      font-size: 12px;
      color: #999;
    }
    
    .footer a {
      color: #999;
      text-decoration: none;
      margin: 0 10px;
    }
    
    @media (max-width: 600px) {
      .container {
        padding: 20px 15px;
      }
      .fitid-badge {
        font-size: 18px;
        padding: 6px 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <img 
        src="https://threadline.work/logo.png" 
        alt="Threadline" 
        class="logo"
        style="max-width: 180px; height: auto;"
      />
    </div>

    <!-- Title / Badge -->
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="font-size: 14px; color: #666; letter-spacing: 2px; margin-bottom: 10px; font-weight: normal;">
        YOUR THREADLINE FITID
      </h1>
      <div class="fitid-badge">${fitId || ''}</div>
    </div>

    <!-- Main Content -->
    ${content}

    <!-- Footer -->
    <div class="footer">
      <p>
        <a href="https://threadline.work/privacy">Privacy</a>
        <a href="https://threadline.work/imprint">Imprint</a>
        <a href="{{unsubscribe}}">Unsubscribe</a>
        <a href="{{viewInBrowser}}">View in browser</a>
      </p>
      <p>© ${new Date().getFullYear()} Threadline. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;