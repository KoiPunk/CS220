/* The navigation bar! */

import title from "/src/assets/branding/title.png";

export default function NavBar() {
    return (
        <header>
            {/* website's title */}
            <a href="/"><img src={title} alt="TOBIKROE Logo" /></a>

            {/* navigation items */}
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/blog">Blog</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/oular">Oular System</a></li>
                    {/* <li><a href="store">Store</a></li> */}
                    <li><a href="projects">Projects</a></li>
                </ul>
            </nav>
        </header>
    )
}