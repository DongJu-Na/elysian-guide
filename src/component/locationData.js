import { useTranslation } from "react-i18next"
import { useMemo } from "react";

function LocationData() {
    const { t, i18n } = useTranslation();

  return useMemo(()=> [
    {
      "id": 1,
      "name": t("data.golfCourse.name"),
      "description": t("data.golfCourse.description"),
      "latitude": 37.829913586492644,
      "longitude": 127.57855196226501,
      "image": null,
      "audio": null
    },
    {
      "id": 2,
      "name": t("data.golfPracticeRange.name"),
      "description": t("data.golfPracticeRange.description"),
      "latitude": 37.82340463669306,
      "longitude": 127.5875761736263,
      "image": null,
      "audio": null
    },
    {
      "id": 3,
      "name": t("data.elSuiteCondo.name"),
      "description": t("data.elSuiteCondo.description"),
      "latitude": 37.822149517093465,
      "longitude": 127.58994000036252,
      "image": null,
      "audio": null
    },
    {
      "id": 4,
      "name": t("data.skiResort.name"),
      "description": t("data.skiResort.description"),
      "latitude": 37.81998591296518,
      "longitude": 127.59020671559892,
      "image": null,
      "audio": null
    },
    {
      "id": 5,
      "name": t("data.yellowChicken.name"),
      "description": t("data.yellowChicken.description"),
      "latitude": 37.82186509076816,
      "longitude": 127.5900655109807,
      "image": null,
      "audio": null
    },
    {
      "id": 6,
      "name": t("data.shadeHouse.name"),
      "description": t("data.shadeHouse.description"),
      "latitude": 37.83081958257344,
      "longitude": 127.57935701506321,
      "image": null,
      "audio": null
    },
    {
      "id": 7,
      "name": t("data.grandChefGolf.name"),
      "description": t("data.grandChefGolf.description"),
      "latitude": 37.829902199579664,
      "longitude": 127.5785774310573,
      "image": null,
      "audio": null
    },
    {
      "id": 8,
      "name": t("data.wonderBurger.name"),
      "description": t("data.wonderBurger.description"),
      "latitude": 37.819661699455295,
      "longitude": 127.59018141914059,
      "image": null,
      "audio": null
    },
    {
      "id": 9,
      "name": t("data.alpHouse.name"),
      "description": t("data.alpHouse.description"),
      "latitude": 37.81524201448445,
      "longitude": 127.58259968472164,
      "image": null,
      "audio": null
    },
    {
      "id": 10,
      "name": t("data.bochale.name"),
      "description": t("data.bochale.description"),
      "latitude": 37.81985798862396,
      "longitude": 127.59011483747767,
      "image": null,
      "audio": null
    },
    {
      "id": 11,
      "name": t("data.cheongchunBan.name"),
      "description": t("data.cheongchunBan.description"),
      "latitude": 37.81525566856814,
      "longitude": 127.58257140019343 ,
      "image": null,
      "audio": null
    },
    {
      "id": 12,
      "name": t("data.snowGarden.name"),
      "description": t("data.snowGarden.description"),
      "latitude": 37.81549790472812,
      "longitude": 127.59226062717221,
      "image": null,
      "audio": null
    },
    {
      "id": 13,
      "name": t("data.beerGarden.name"),
      "description": t("data.beerGarden.description"),
      "latitude": 37.82118094038755,
      "longitude": 127.58995216664852,
      "image": null,
      "audio": null
    },
    {
      "id": 14,
      "name": t("data.starlightGrillBBQ.name"),
      "description": t("data.starlightGrillBBQ.description"),
      "latitude": 37.82118094038755,
      "longitude": 127.58995216664852,
      "image": null,
      "audio": null
    },
    {
      "id": 15,
      "name": t("data.odeum.name"),
      "description": t("data.odeum.description"),
      "latitude": 37.821886859521996,
      "longitude": 127.59021617442626,
      "image": null,
      "audio": null
    },
    {
      "id": 16,
      "name": t("data.grandGrill.name"),
      "description": t("data.grandGrill.description"),
      "latitude": 37.822115235230115,
      "longitude": 127.5900391080666,
      "image": null,
      "audio": null
    },
    {
      "id": 17,
      "name": t("data.aravista.name"),
      "description": t("data.aravista.description"),
      "latitude": 37.821661200582696,
      "longitude": 127.58985093062716,
      "image": null,
      "audio": null
    },
    {
      "id": 18,
      "name": t("data.grandChefCondo.name"),
      "description": t("data.grandChefCondo.description"),
      "latitude": 37.82187591115232,
      "longitude": 127.59015361964525,
      "image": null,
      "audio": null
    },
    {
      "id": 19,
      "name": t("data.campingPark.name"),
      "description": t("data.campingPark.description"),
      "latitude": 37.82113728826797,
      "longitude": 127.58967355722301,
      "image": null,
      "audio": null
    },
    {
      "id": 20,
      "name": t("data.lawnSportsField.name"),
      "description": t("data.lawnSportsField.description"),
      "latitude": 37.827110232135674,
      "longitude": 127.58703194892894,
      "image": null,
      "audio": null
    },
    {
      "id": 21,
      "name": t("data.outdoorPool.name"),
      "description": t("data.outdoorPool.description"),
      "latitude": 37.82309913124466,
      "longitude": 127.58966645055202,
      "image": null,
      "audio": null
    },
    {
      "id": 22,
      "name": t("data.goKart.name"),
      "description": t("data.goKart.description"),
      "latitude": 37.82021867945766,
      "longitude": 127.59005240360717,
      "image": null,
      "audio": null
    }
    ], [t, i18n.language]);
};

export default LocationData;
