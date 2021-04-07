# Dezvoltarea actelor de studii pe Ethereum Blockhain


## Cuprins
- [Instalare](#Instalare)
- [Integrare_cu_node](#Integrare_cu_node)


### #Inslare

1. Instalare node & npm
```
sudo apt install nodejs
sudo apt install npm
```

2. Instalare nvm 
```
sudo apt update
sudo apt install build-essential checkinstall libssl-dev
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.1/install.sh | bash
nvm --version
```
	
3. Verifiare versiune node si instlare versiunea dorita
```
nvm ls
nvm ls-remote
nvm install [version.number]
```
	
4. Instalare truffle global
```
npm install truffle -g
```

5. truffle init / clone la primul commit

### #Integrare_cu_node

1. Initializare node.js
```
<code>$ npm init && touch server.js routes.js</code>
```

2. Instalare dependinte node
```
npm install express --save
npm install nodemon
npm install web3
npm install dotenv
npm install @truffle/hdwallet-provider
```
