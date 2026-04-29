/* Footer */

import instagram from "/src/assets/icons/instagram.png";
import tumblr from "/src/assets/icons/tumblr.png";
import youtube from "/src/assets/icons/youtube.png";

// all the links and lists in the footer's sitemap. Each item is a tuple [name, url]
const footer_items: [string, string][][] = [[
        ["Home","/"],
        ["About", "/about"],
        ["Blog", "/blog"],
        ["FAQ", "/faq"]
    ],[
        ["Programming", "/programming"],
        ["Web Dev", "/web-dev"],
        ["Robotic", "/robotic"]
    ],[
        ["Art","/art"],
        ["Oular System", "/oular"],
        ["Fanart","/art/fanart"],
        ["Illustration","/art/illustration"],
        ["Sketches","/art/sketches"],
        ["Animation","/art/animation"]
    ],[
        ["Misc", "/projects"],
        ["Life Science", "life-science"],
        ["Food", "/food"],
        ["Plants", "/plants"]
    ],[
        ["Store", "/store"],
        ["Cart", "/store/cart"],
        ["Saved", "/store/saved"],
        ["FAQ", "/store/faq"]
    ]
];

export default function Footer() {
    return (
        <footer>
            <div class="flex">
                {/* infos */}
                <div class="footer-info">
                    <a href="/">TOBIKROE</a>
                    <p>Your local one-stop shop for all things ever!</p>
                </div>

                {/* sitemap lists, insert multiple <ul>'s of <li>'s */}
                <FooterList />
            </div>

            <div class="footer-sub flex">
                {/* copyright */}
                <p>© 2026 TOBIKROE</p>
                {/* socials */}
                <ul class="social-links flex">
                    <li><a href="/404"><img src={instagram} alt="Instagram icon" /></a></li>
                    <li><a href="/404"><img src={tumblr} alt="Tumblr icon" /></a></li>
                    <li><a href="/404"><img src={youtube} alt="Youtube icon" /></a></li>
                </ul>
            </div>
        </footer>
    )
}

// turn footer_items: [string, string][][] into multiple <ul> of <li><a></a></li>
function FooterList() {
    return (
        <div class="footer-sitemap flex">
            {footer_items.map((list) => (
                <ul>
                    {list.map(([name, url]) => (
                        <li><a href={url}> {name} </a></li>
                    ))}
                </ul>
            ))}
        </div>
    );
}
