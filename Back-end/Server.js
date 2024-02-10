const express = require("express");
const Connectdb = require("./Config/Config");
const UserRouter = require("./Routers/User_Router");
const CaisseRouter = require("./Routers/Caisse1_Router");
const CaisseEventRouter = require("./Routers/Caisse_event_Router");
const cors = require("cors");
const ProductstRouter = require("./Routers/Achat_Router");
const BankCaisseRouter = require("./Routers/Bank_caisse_Router");
const app = express();
const port = 8000;
const Caisses = require("./Models/Caisse1_model");
const CaissesEvent = require("./Models/Caisse_event_model");
const Products = require("./Models/Achat_model");
const HistoryModel = require("./Models/History_model");
const Bank_caisse_model = require("./Models/Bank_caisse_model");
const LiquideDisponibleRouter = require("./Routers/LiquideDisponible_Router");
const HistoryRouter = require("./Routers/History_Router");
const LiquideDisponible = require("./Models/LiquideDisponible");

Connectdb();
app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use("/user", UserRouter);
app.use("/caisse", CaisseRouter);
app.use("/caisseEvent", CaisseEventRouter);
app.use("/achat", ProductstRouter);
app.use("/bank", BankCaisseRouter);
app.use("/liquide", LiquideDisponibleRouter);
app.use("/history", HistoryRouter);

const dispatchHistory = new Date().getHours();

const addHistory = async () => {
  if (dispatchHistory === 23) {
    console.log(dispatchHistory);
    const caisse1 = await Caisses.find();
    const caisseEvent = await CaissesEvent.findById("65b27573340ca3038c4836ef");
    const Bankcaisse = await Bank_caisse_model.findById(
      "65b65b69e5cbc78b66f1c66a"
    );
    const liquideDisponible = await LiquideDisponible.findById(
      "65bd25f77706ab43033ece92"
    );
    console.log(LiquideDisponible);
    const AchatProduct = await Products.find();

    const History = new HistoryModel({
      caisses1: caisse1,
      caisseEvent,
      Bankcaisse,
      AchatProduct,
      LiquideDisponible: liquideDisponible,
    });
    console.log(History);
    await History.save();

    await Caisses.findByIdAndUpdate("65b1b708aeeb6d36cd4d3ae1", {
      $set: {
        Recette: [],
        Liquide: { montantLiquide: 0 },
        Cheques: [],
        TPEs: [],
        TicketDeCaisse: [],
      },
    });
    await Caisses.findByIdAndUpdate("65b1b70baeeb6d36cd4d3ae6", {
      $set: {
        Recette: [],
        Liquide: { montantLiquide: 0 },
        Cheques: [],
        TPEs: [],
        TicketDeCaisse: [],
      },
    });
    await Caisses.findByIdAndUpdate("65b1b70faeeb6d36cd4d3aeb", {
      $set: {
        Recette: [],
        Liquide: { montantLiquide: 0 },
        Cheques: [],
        TPEs: [],
        TicketDeCaisse: [],
      },
    });
    await Caisses.findByIdAndUpdate("65b1b713aeeb6d36cd4d3af0", {
      $set: {
        Recette: [],
        Liquide: { montantLiquide: 0 },
        Cheques: [],
        TPEs: [],
        TicketDeCaisse: [],
      },
    });
    await Bank_caisse_model.findByIdAndUpdate("65b65b69e5cbc78b66f1c66a", {
      $set: { Montant: 0, Motif: "", Image: "" },
    });
    await CaissesEvent.findByIdAndUpdate("65b27573340ca3038c4836ef", {
      $set: {
        Recette: [],
        Liquide: { montantLiquide: 0 },
        Cheques: [],
        TPEs: [],
        TicketDeCaisse: [],
      },
    });

    await Products.deleteMany();
  }
};

setInterval(addHistory, 10000);

app.listen(port, console.log("Server is runing at port 8000"));
