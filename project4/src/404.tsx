import not_found from "/src/assets/404.png";

export default function NotFound() {
    return (
        <section class="not-found">
            <h1>404 - Work in progress!</h1>
            <img src={not_found} alt="404" />
            <p>This page either doesn't exist or isn't ready to be viewed by the public eye yet.</p>
            <p>Please hold while we prepare it for our grand opening!</p>
        </section>
    )
}