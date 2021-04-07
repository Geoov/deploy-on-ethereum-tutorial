var crypto = require("crypto");

function routes(app, web3, contract) {
  const AN_UNIV = 2021;

  app.post("/create-pdf", async (req, res) => {
    const email = req.body.email;
    const nrMatricol = req.body.nrMatricol;
    const nume = req.body.nume;
    const prenume = req.body.prenume;
    const nota = req.body.nota;

    console.log(email, nrMatricol, nume, prenume, nota);

    if (email && nrMatricol && nume && prenume && nota) {
      // creare PDF

      // semnare PDF ..?

      // postare pe IPFS

      const ipfsHash = "ipfs_Hash";

      // postare pe Ropsten

      const address =
        "0x" +
        crypto
          .createHash("sha256")
          .update(email + nrMatricol + AN_UNIV)
          .digest("hex");
      console.log("Adresa eth ", address);

      const hashEmail = crypto.createHash("sha256").update(email).digest("hex");
      console.log("Adresa email ", hashEmail);

      const gasPrice = await web3.eth.getGasPrice();
      console.log(gasPrice);

      const gasEstimate = await contract.methods
        .createDiploma(address, ipfsHash, hashEmail, nota)
        .estimateGas({ from: web3.eth.defaultAccount });
      console.log(gasEstimate);

      contract.methods
        .createDiploma(address, ipfsHash, hashEmail, nota)
        .send({
          from: web3.eth.defaultAccount,
          gasPrice: gasPrice,
          gas: gasEstimate,
        })
        .on("transactionHash", function (hash) {
          console.log(hash);
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          console.log(confirmationNumber);
        })
        .on("error", function (error, receipt) {
          throw error;
        });

      // introducere date in mongo + mysql + logs
    } else {
      res.status(400).json({
        status: "A eșuat",
        reason: "Nu au fost introduse toate datele.",
      });
    }
  });

  app.post("/verify-authenticity", async (req, res) => {
    const email = req.body.email;
    const nrMatricol = req.body.nrMatricol;
    const anUniv = req.body.anUniv;

    console.log(email, nrMatricol, anUniv);

    if (email && nrMatricol && anUniv) {
      const address =
        "0x" +
        crypto
          .createHash("sha256")
          .update(email + nrMatricol + anUniv)
          .digest("hex");
      console.log("Adresa eth ", address);

      contract.methods
        .getDiploma(address)
        .call({ from: web3.eth.defaultAccount })
        .then(function (result) {
          console.log(result);
          console.log(result[0])
        });
    }
  });
}

module.exports = routes;
