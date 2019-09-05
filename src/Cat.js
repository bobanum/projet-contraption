/*jslint esnext:true, browser:true*/
/**
 * @module Cat
 */
export default class Cat {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * Méthode principale. Sera typiquement appelée après le chargement de la page.
	 */
    static main() {
        this.app = document.getElementById('app');
        this.ajouterStyle();
        var chat1 = new Cat(400, 300);
        this.app.appendChild(chat1.creerSprite());
        chat1.deplacer(10, 300);
        setTimeout(function() {
            chat1.deplacer(300, 0);
        }, 3000);
        setTimeout(function() {
            chat1.deplacer(700, 700);
        }, 10000);
        this.app.addEventListener("click", (e) => {
            chat1.deplacer(e.clientX, e.clientY);
        });
    }
    static ajouterStyle() {
        var style = document.createElement("link");
        document.head.appendChild(style);
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', './src/cat.css');
    }
    creerSprite() {
        var resultat = document.createElement('div');
        resultat.classList.add("sprite");
        resultat.classList.add("cat");
        resultat.style.left = this.x + "px";
        resultat.style.top = this.y + "px";
        resultat.obj = this;
        this.sprite = resultat;
        return resultat;
    }
    deplacer(x, y) {
        var distance = Math.sqrt((x - this.x)*(x - this.x) + (y - this.y)*(y - this.y));
        if (x > this.x) {
            this.sprite.style.transform = "scale(-1,1)";
        }
        this.x = x;
        this.y = y;
        setTimeout(() => {
            var duree = distance * 5;
            this.sprite.style.transitionDuration = duree + "ms";
            this.sprite.style.transitionTimingFunction = "linear";
            this.sprite.style.animationName = "walk";
            this.sprite.style.animationDuration = 500 + "ms";
            this.sprite.style.left = this.x + "px";
            this.sprite.style.top = this.y + "px";
        }, 10);
        var stop = (e) => {
            this.sprite.style.removeProperty("transition-duration");
            this.sprite.style.removeProperty("transition-timing-function");
            this.sprite.style.removeProperty("animation-name");
            this.sprite.style.removeProperty("animation-duration");
            this.sprite.style.removeProperty("transform");
            this.sprite.removeEventListener("transitionend", stop);
        }
        this.sprite.addEventListener("transitionend", stop);
    }
}
