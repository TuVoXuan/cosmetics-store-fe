import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				{/* 
        
       Messenger Plugin chat Code
        */}
				<div id="fb-root"></div>

				{/* Your Plugin chat code */}

				<div id="fb-customer-chat" className="fb-customerchat"></div>

				<Script
					id="messenger-tag"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
              const pageId = process.env.PAGE_ID
              var chatbox = document.getElementById('fb-customer-chat');
              chatbox.setAttribute("page_id", pageId);
              chatbox.setAttribute("attribution", "biz_inbox");
            `,
					}}
				></Script>
				<Script
					id="messenger-sdk"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `window.fbAsyncInit = function() {
                        FB.init({
                          xfbml            : true,
                          version          : 'v16.0'
                        });
                      };

                      (function(d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) return;
                        js = d.createElement(s); js.id = id;
                        js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
                        fjs.parentNode.insertBefore(js, fjs);
                      }(document, 'script', 'facebook-jssdk'));`,
					}}
				></Script>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
