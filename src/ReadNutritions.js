import React, { useContext } from 'react';
import finelli from './finelli5';
import { NutritionDispatchContext } from './context/nutrition.context';
const finelli3 = require('./finelli3.json');

export default function ReadNutritions() {
  const nutritionDispatch = useContext(NutritionDispatchContext);
  let nutrition;

  const nutritionInfo = [
    { id: 0, name: { fi: 'id' } },
    { id: 1, name: { fi: 'name' } },
    { id: 2, name: { fi: 'energia, laskennallinen (kJ)' }, unit: 'kJ' },
    { id: 3, name: { fi: 'hiilihydraatti imeytyva (g)' }, unit: 'g' },
    { id: 4, name: { fi: 'rasva (g)' }, unit: 'g' },
    { id: 5, name: { fi: 'proteiini (g)' }, unit: 'g' },
    { id: 6, name: { fi: 'alkoholi (g)' }, unit: 'g' },
    { id: 7, name: { fi: 'kuitu, kokonais- (g)' }, unit: 'g' },
    { id: 8, name: { fi: 'orgaaniset hapot (g)' }, unit: 'g' },
    { id: 9, name: { fi: 'sokerialkoholi (g)' }, unit: 'g' },
    { id: 10, name: { fi: 'tarkkelys (g)' }, unit: 'g' },
    { id: 11, name: { fi: 'sokerit (g)' }, unit: 'g' },
    { id: 12, name: { fi: 'fruktoosi (g)' }, unit: 'g' },
    { id: 13, name: { fi: 'galaktoosi (g)' }, unit: 'g' },
    { id: 14, name: { fi: 'glukoosi (g)' }, unit: 'g' },
    { id: 15, name: { fi: 'laktoosi (g)' }, unit: 'g' },
    { id: 16, name: { fi: 'maltoosi (g)' }, unit: 'g' },
    { id: 17, name: { fi: 'sakkaroosi (g)' }, unit: 'g' },
    {
      id: 18,
      name: { fi: 'polysakkaridi, vesiliukoinen ei-selluloosa (g)' },
      unit: 'g'
    },
    { id: 19, name: { fi: 'kuitu veteen liukenematon (g)' }, unit: 'g' },
    { id: 20, name: { fi: 'rasvahapot yhteensa (g)' }, unit: 'g' },
    { id: 21, name: { fi: 'rasvahapot monityydyttymattomat (g)' }, unit: 'g' },
    {
      id: 22,
      name: { fi: 'rasvahapot yksittaistyydyttymattomat cis (g)' },
      unit: 'g'
    },
    { id: 23, name: { fi: 'rasvahapot tyydyttyneet (g)' }, unit: 'g' },
    { id: 24, name: { fi: 'rasvahapot trans (g)' }, unit: 'g' },
    {
      id: 25,
      name: { fi: 'rasvahapot n-3 monityydyttymattomat (g)' },
      unit: 'g'
    },
    {
      id: 26,
      name: { fi: 'rasvahapot n-6 monityydyttymattomat (g)' },
      unit: 'g'
    },
    {
      id: 27,
      name: { fi: 'rasvahappo 18:2 cis,cis n-6 (linolihappo) (mg)' },
      unit: 'mg'
    },
    {
      id: 28,
      name: { fi: 'rasvahappo 18:3 n-3 (alfalinoleenihappo) (mg)' },
      unit: 'mg'
    },
    { id: 29, name: { fi: 'rasvahappo 20:5 n-3 (EPA) (mg)' }, unit: 'mg' },
    { id: 30, name: { fi: 'rasvahappo 22:6 n-3 (DHA) (mg)' }, unit: 'mg' },
    { id: 31, name: { fi: 'kolesteroli (GC) (mg)' }, unit: 'mg' },
    { id: 32, name: { fi: 'sterolit (mg)' }, unit: 'mg' },
    {
      id: 33,
      name: { fi: 'kalsium', en: 'calcium' },
      unit: 'mg',
      dri: {
        ai: 1000,
        ul: 2500
      }
    },
    {
      id: 34,
      name: { fi: 'rauta', en: 'iron' },
      unit: 'mg',
      dri: {
        rda: {
          males: 8,
          females: 18
        },
        ai: 1000,
        ul: 45
      }
    },
    {
      id: 35,
      name: { fi: 'jodidi (jodi)', en: 'iodine' },
      unit: 'yg',
      dri: {
        rda: {
          males: 150,
          females: 150
        }
      }
    },
    {
      id: 36,
      name: { fi: 'kalium', en: 'potassium' },
      unit: 'mg',
      dri: {
        ai: 4700
      }
    },
    {
      id: 37,
      name: { fi: 'magnesium', en: 'magnesium' },
      unit: 'mg',
      dri: {
        rda: { males: 420, females: 320 }
      }
    },
    {
      id: 38,
      name: { fi: 'natrium', en: 'sodium' },
      unit: 'mg',
      dri: {
        ai: 1500,
        ul: 2300
      }
    },
    {
      id: 39,
      name: { fi: 'suola', en: 'salt, sodium and chloride' },
      dri: {
        ai: 3800,
        ul: 5900
      },
      unit: 'mg'
    },
    {
      id: 40,
      name: { fi: 'fosfori', en: 'phosphorus' },
      unit: 'mg',
      dri: {
        rda: 700,
        ul: 4000
      }
    },
    {
      id: 41,
      name: { fi: 'seleeni', en: 'selenium' },
      unit: 'yg',
      dri: {
        rda: 55
      }
    },
    {
      id: 42,
      name: { fi: 'sinkki', en: 'zinc' },
      unit: 'mg',
      dri: {
        rda: { males: 11, females: 8 }
      }
    },
    { id: 43, name: { fi: 'tryptofaani (mg)' }, unit: 'mg' },
    {
      id: 44,
      name: { fi: 'folaatti', en: 'folate' },
      unit: 'yg',
      dri: {
        rda: 400
      }
    },
    { id: 45, name: { fi: 'niasiiniekvivalentti NE' }, unit: 'mg' },
    {
      id: 46,
      name: {
        fi: 'niasiini (nikotiinihappo + nikotiiniamidi)',
        fiLong: 'niasiini (nikotiinihappo + nikotiiniamidi)',
        en: 'niacin'
      },
      unit: 'mg',
      dri: {
        rda: { males: 16, females: 14 },
        ul: 35
      }
    },
    {
      id: 47,
      name: {
        fi: 'B6-vitamiini',
        fiLong: 'pyridoksiini vitameerit (vetykloridi) (B6) (mg)',
        en: 'vitamin B6'
      },
      unit: 'mg',
      dri: {
        rda: 1.3,
        ul: 100
      }
    },
    {
      id: 48,
      name: { fi: 'B2-vitamiini, riboflaviini', en: 'vitamin B2, riboflavin' },
      unit: 'mg',
      dri: {
        rda: { males: 1.3, females: 1.1 }
      }
    },
    {
      id: 49,
      name: { fi: 'B1-vitamiini, tiamiini', en: 'vitamin B1, thiamin' },
      unit: 'mg',
      dri: {
        rda: { males: 1.2, females: 1.1 }
      }
    },
    {
      id: 50,
      name: { fi: 'B12-vitamiini, kobalamiini', en: 'vitamin B12, cobalamin' },
      unit: 'yg',
      dri: {
        rda: 2.4
      }
    },
    {
      id: 51,
      name: { fi: 'C-vitamiini (mg)', en: 'vitamin C' },
      unit: 'mg',
      dri: {
        rda: { males: 90, females: 75 }
      }
    },
    {
      id: 52,
      name: { fi: 'A-vitamiini RAE', en: 'vitamin A' },
      unit: 'yg',
      dri: {
        rda: { males: 900, females: 700 }
      }
    },
    { id: 53, name: { fi: 'karotenoidit', en: 'carotenoids' }, unit: 'g' },
    {
      id: 54,
      name: { fi: 'D-vitamiini', en: 'vitamin D' },
      unit: 'yg',
      dri: {
        rda: 5,
        ul: 50
      }
    },
    {
      id: 55,
      name: { fi: 'E-vitamiini alfatokoferoli', en: 'vitamin E' },
      unit: 'mg',
      dri: {
        rda: 15
      }
    },
    {
      id: 56,
      name: { fi: 'K-vitamiini', en: 'vitamin K' },
      unit: 'yg',
      dri: {
        rda: { males: 120, females: 90 }
      }
    }
  ];

  // {recommendation: [{man: 900, woman: 700, unit:"RE", source: "http://www.voimaaruuasta.fi"}]}
  /*

            Vitamiinien ja kivennäisaineiden saantisuositukset
            Miehet	Naiset
            Vitamiinit	 	 
            A-vitamiini, RE	900	700
            D-vitamiini, µg	10/20 1	10/20
            E-vitamiini, α-TE	10	8
            Tiamiini, (B1-vitamiini), mg	1,3 /1,2 2	1,0
            Riboflaviini, (B2-vitamiini), mg	1,5/1,3 2	1,3/1,2 2
            Niasiini, NE	17/15 2	14/13 2
            B6-vitamiini, mg	1,6	1,2
            Folaatti, µg	300	300
            B12-vitamiini, µg	2,0	2,0
            C-vitamiini, mg	75	75
            Kivennäisaineet	 	 
            Kalsium, mg	800	800
            Fosfori, mg	600	600
            Kalium, g	3,5	3,1
            Magnesium, mg	350	350
            Rauta, mg	9	9
            Sinkki, mg	9	7
            Kupari, mg	0,9	0,9
            Jodi, µg	150	150
            Seleeni, µg	60	50

      nutritionInfo [{
      name: "D-vitamiini"
      recommendation: [{
        amount: 100,
        unit: "mg", 
        recommender: "Finelli"
      },
      {
        amount: 110,
        unit: "mg"
        recommender: "USAX"
      }]
    },
    {
      name: "K-vitamiini",
      recommendation:[{...}]
    },
  ]

  */

  for (const [i, finelliNutrition] of finelli3.entries()) {
    // console.log(i, finelliNutrition);
    if (i > 10) {
      break;
    }
    if (i === 0) {
      nutritionDispatch({
        type: 'ADD_INFO',
        nutritionInfo
      });
    } else {
      nutrition = {};
      nutrition = {
        id: +finelliNutrition[0],
        name: finelliNutrition[1],
        energy: +finelliNutrition[2].replace(',', '.').replace(' ', ''),
        carbohydrates: +finelliNutrition[3].replace(',', '.').replace(' ', ''),
        fet: +finelliNutrition[4].replace(',', '.').replace(' ', ''),
        protein: +finelliNutrition[5].replace(',', '.').replace(' ', '')
      };
      for (const [j, part] of finelliNutrition.entries()) {
        if (j > 1) {
          nutrition[j.toString()] = +finelliNutrition[j]
            .replace(',', '.')
            .replace(' ', '');
        } else {
          nutrition[j.toString()] = finelliNutrition[j];
        }
      }

      nutritionDispatch({
        type: 'NEW',
        nutrition
      });
    }
  }
  return <p>READ NUTRITIONS</p>;
}

function ReadNutritionsFinelli5() {
  // const nutritions = useContext(NutritionContext);
  const nutritionDispatch = useContext(NutritionDispatchContext);
  // const showDispatch = useContext(ShowDispatchContext);
  for (const [i, nutrient] of finelli.entries()) {
    // if (i > 100) {
    //   break;
    // }
    if (i > 0) {
      // console.log(nutrient);
      console.log(nutrient);
      nutritionDispatch({
        type: 'NEW',
        nutrition: {
          id: nutrient[0],
          name: nutrient[1],
          energy: +nutrient[2].replace(',', '.').replace(' ', ''),
          carbohydrates: +nutrient[3].replace(',', '.').replace(' ', ''),
          fet: +nutrient[4].replace(',', '.').replace(' ', ''),
          protein: +nutrient[5].replace(',', '.').replace(' ', '')
        }
      });
    }
  }
  console.log('Nutritions red');
  // for (const [nutritionIndex, nutrition] of nutritions.entries()) {
  //   showDispatch({
  //     type: 'ADD_NUTRITION_ID',
  //     nutritionIndex,
  //     nutritionId: nutrition.id
  //   });
  // }

  return <h1>READ NUTRITIONS</h1>;
}
