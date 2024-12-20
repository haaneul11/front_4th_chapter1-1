import Main from "@/pages/HomePage";
import Login from "@/pages/LoginPage";
import Profile from "@/pages/ProfilePage";
import Error from "@/pages/ErrorPage";
import { URL } from "@/config/Config";
import { initRender } from "@/core/Renderer";

export default class Router {
  private static instance: Router;
  private routes: Map<String, () => string>;
  private $app: HTMLElement;

  private constructor() {
    this.routes = new Map([
      ["/", Main],
      ["/login", Login],
      ["/profile", Profile],
      ["404", Error],
    ]) as Map<string, () => string>;

    this.$app = document.getElementById("root") as HTMLElement;

    window.addEventListener("popstate", () => {
      this.render(location.pathname);
    });

    this.render(location.pathname);
  }

  public static getInstance() {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  render(path: string) {
    if (this.routes.has(path)) {
      history.pushState({}, "", window.location.origin + path);
      const routeToPath = this.routes.get(path) as () => string;
      this.$app.innerHTML = routeToPath();
      initRender(this.$app, routeToPath);
    } else {
      history.pushState({}, "", window.location.origin + "/");
      const routeToMain = this.routes.get("/") as () => string;
      initRender(this.$app, routeToMain);
    }
    this.addWholeAnchorEvent();
  }

  addWholeAnchorEvent() {
    const aTage = document.querySelectorAll("a");
    aTage.forEach((tag) =>
      tag.addEventListener("click", (e) => {
        e.preventDefault();
        const tagRef = tag.href.replace(URL.BASE_URL_DEV, "");
        this.render(tagRef);
      }),
    );
  }
}
