import { Produit } from "./produit";

export interface Panier extends Produit {
    quantite: number;
}

export function createPanierItem(produit: Produit, quantite: number = 1): Panier {
    return {
        ...produit,
        quantite
    };
}
