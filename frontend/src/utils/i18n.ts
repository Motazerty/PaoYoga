// Simple i18n utility for translation
export type Language = 'fr' | 'en';

const translations: Record<Language, Record<string, string>> = {
  fr: {
    welcome:'Accueil',
    profile: 'Mon Profil',
    email: 'Email',
    name: 'Nom',
    edit: 'Modifier le profil',
    purchaseHistory: "Historique d'achats",
    noPurchases: 'Aucun achat trouvé.',
    videos: 'Mes vidéos',
    allVideos: 'Toutes les vidéos',
    search: 'Rechercher une vidéo...',
    all: 'Toutes',
    yoga: 'Yoga',
    massage: 'Massage',
    beauty: 'Beauté',
    favorites: 'Favoris',
    watched: 'Regardé',
    close: 'Fermer',
    notConnected: 'Non connecté',
    price: 'Prix',
    P: 'P',
    PaoYoga: 'PaoYoga',
    copyright: '© 2025 PaoYoga. Tous droits réservés.',
    contact: 'Contact : contact@paoyoga.com',
    followUs: 'Suivez-nous :',
    aboutUs: 'À propos',
    about: 'À propos',
    spiritualObjects: 'Objets spirituels',
    cart: 'Mon Panier',
    cartEmpty: 'Votre panier est vide.',
    login: 'Connexion',
    password: 'Mot de passe',
    forgotPassword: 'Mot de passe oublié ?',
    signIn: 'Se connecter',
  },
  en: {
    welcome: 'Welcome',
    profile: 'My Profile',
    email: 'Email',
    name: 'Name',
    edit: 'Edit Profile',
    purchaseHistory: 'Purchase History',
    noPurchases: 'No purchases found.',
    videos: 'My Videos',
    allVideos: 'All Videos',
    search: 'Search for a video...',
    all: 'All',
    yoga: 'Yoga',
    massage: 'Massage',
    beauty: 'Beauty',
    favorites: 'Favorites',
    watched: 'Watched',
    close: 'Close',
    notConnected: 'Not connected',
    price: 'Price',
    P: 'P',
    PaoYoga: 'PaoYoga',
    copyright: '© 2025 PaoYoga. All rights reserved.',
    contact: 'Contact: contact@paoyoga.com',
    followUs: 'Follow us:',
    aboutUs: 'About Us',
    about: 'About Us',
    spiritualObjects: 'Spiritual Objects',
    cart: 'My Cart',
    cartEmpty: 'Your cart is empty.',
    login: 'Login',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    signIn: 'Sign In',
  },
};

let currentLanguage: Language = 'fr';

export function setLanguage(lang: Language) {
  currentLanguage = lang;
}

export function t(key: string): string {
  return translations[currentLanguage][key] || key;
}
