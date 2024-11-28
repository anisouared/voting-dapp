# Système de Vote Décentralisé - DApp avec Smart Contract

Ce projet implémente un système de vote décentralisé (DApp) pour la blockchain Ethereum, permettant à un administrateur et aux électeurs inscrits de gérer une session de vote sécurisée. Le système est composé d'un **smart contract** en Solidity qui est déployé sur un réseau Ethereum (Sepolia, pour ce projet), et d'une interface frontend en NextJS pour interagir avec le contrat.

## Fonctionnalités

- **Enregistrement de la liste blanche des électeurs** : Seuls les électeurs inscrits peuvent participer.
- **Gestion de la session d'enregistrement des propositions** :
  - L'administrateur peut démarrer et mettre fin à la session d'enregistrement.
  - Les électeurs inscrits peuvent enregistrer leurs propositions durant cette session.
- **Gestion de la session de vote** :
  - L'administrateur peut démarrer et mettre fin à la session de vote.
  - Les électeurs inscrits peuvent voter pour leurs propositions préférées.
- **Comptabilisation des votes** : L'administrateur peut comptabiliser les votes après la fin de la session de vote.
- **Consultation des résultats** : Tout le monde peut consulter les résultats du vote.

## Fonctionnement du Smart Contract

Le **smart contract** est écrit en **Solidity** et déployé sur le testnet **Sepolia**. Voici un résumé des principales fonctionnalités du contrat :

1. **Enregistrement des électeurs** : Les électeurs sont inscrits par l'administrateur.
2. **Gestion des propositions** : Les électeurs peuvent soumettre des propositions durant une session dédiée.
3. **Gestion du vote** : Les électeurs peuvent voter pour les propositions pendant une session de vote.
4. **Comptabilisation des votes** : À la fin de la session de vote, l'administrateur peut comptabiliser les résultats et afficher le nombre de votes pour chaque proposition.

## Déploiement et Démo

- **Vidéo Démo des Fonctionnalités** :  
  Vous pouvez consulter la vidéo démontrant les fonctionnalités du système [ici](https://liendevideo.com).
  
- **Déploiement public de la DApp** :  
  La DApp est accessible sur Vercel à l'adresse suivante :  
  [Voting DApp](https://voting-dapp-blush.vercel.app/)

- **Smart Contract Déployé sur Sepolia** :  
  Vous pouvez consulter le smart contract sur le testnet **Sepolia** via l'adresse suivante :  
  [0x02063a4f755Fd9b1D5D8675b45126e4801f97d24](https://sepolia.etherscan.io/address/0x02063a4f755Fd9b1D5D8675b45126e4801f97d24)

## Prérequis

Avant de pouvoir utiliser ce projet, vous devez vous assurer d'avoir installé les éléments suivants :

- **Node.js** et **npm** (ou **yarn**) pour gérer les dépendances frontend.
- **MetaMask** ou un autre portefeuille Ethereum pour interagir avec la blockchain via votre navigateur.
- **Hardhat** ou un réseau de test comme **Sepolia** pour tester le smart contract localement ou sur un testnet.

## Installation et Configuration

### Frontend (DApp)

1. Clonez le repository GitHub :
   ```bash
   git clone https://github.com/anisouared/voting-dapp.git
   cd voting-dapp
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Modifiez l'**adresse du contrat** et l'**ABI** dans `frontend/constants/index.js` pour correspondre à votre déploiement local ou sur Sepolia.
   
4. Modifiez egalement la configuration de hardhat dans `backend/hardhat.config.js`, RainbowKitAndWagmiProvider dans `frontend/app/RainbowKitAndWagmiProvider.js` et createPublicClient de viem dans `frontend/utils/client.js` pour correspondre à votre déploiement local ou sur Sepolia.

5. Lancez l'application frontend :
   ```bash
   npm start
   ```

### Backend (Smart Contract)

1. Installez **Hardhat** pour gérer le déploiement du smart contract.
   - [Hardhat](https://hardhat.org/) : Installation via npm
     ```bash
     npm install --save-dev hardhat
     ```

2. Déployez le smart contract sur **Sepolia** (ou votre réseau local/testnet préféré).



## Contribuer

Les contributions sont les bienvenues ! Si vous souhaitez améliorer ce projet, vous pouvez :

1. Forker ce repository.
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalité`).
3. Ajouter vos modifications.
4. Faire un commit de vos changements (`git commit -m 'Ajout d’une nouvelle fonctionnalité'`).
5. Pousser la branche (`git push origin feature/nouvelle-fonctionnalité`).
6. Créer une pull request.

## License

Ce projet est sous la licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Auteur** : Anis OUARED 
**Email** : ouared.anis@gmail.com
**Date de création** : Novembre 2024
