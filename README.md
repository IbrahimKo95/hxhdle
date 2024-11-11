# 🎮 HxHdle

**HxHdle** est un jeu basé sur l'univers de *Hunter x Hunter*, où le but est de deviner un personnage en se basant sur ses caractéristiques. Les joueurs proposent un personnage, puis des informations sur ce personnage sont affichées. En fonction des caractéristiques, un code de couleur (vert, rouge ou orange) indique si les attributs correspondent au personnage à deviner.

![Aperçu]([https://github.com/IbrahimKo95/hxh-dle/blob/main/screenshots/Screenshot.png?raw=true](https://github.com/IbrahimKo95/hxhdle/blob/master/public/img/Screenshot.png?raw=true))

## ⚙️ Technologies

- **Next.js** - ⚛️ Framework React pour le rendu côté serveur et le rendu statique.
- **TailwindCSS** - 🎨 Framework CSS utilitaire pour une mise en page élégante et réactive.
- **Framer Motion** - 🌀 Bibliothèque d'animations pour des transitions fluides et dynamiques lors de l'interaction avec les éléments du jeu.

## 🚀 Installation

1. **Clonez ce dépôt** :

   ```bash
   git clone https://github.com/IbrahimKo95/hxh-dle.git
   cd hxh-dle
    ```
2. **Installez les dépendances** :

   ```bash
   npm install
   ```
3. **Démarrez le serveur de développement** :

   ```bash
   npm run dev
   ```
4. **Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur**.
## 🎮 Comment jouer ?

Le jeu est inspiré du principe de **LoLdle** (disponible sur [loldle.net](https://loldle.net/)), où le but est de deviner un personnage basé sur ses caractéristiques. Voici comment cela fonctionne :

1. **Rechercher un personnage** via la bar de recherche.
2. **Les caractéristiques du personnage** apparaissent (par exemple : affiliations, type de Nen, etc.).
3. **Couleurs de l'indicateur** :
    - 🔴 **Rouge** : La caractéristique ne correspond pas du tout au personnage à deviner.
    - 🟡 **Orange** : La caractéristique correspond partiellement (par exemple, une des affiliations est correcte).
    - 🟢 **Vert** : La caractéristique est exactement la même pour le personnage à deviner.

Essayez de deviner le personnage en minimisant le nombre d'indices erronés !
