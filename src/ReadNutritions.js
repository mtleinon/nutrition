import React, { useContext } from 'react';
import finelli from './finelli5';
import { NutritionDispatchContext } from './context/nutrition.context';
// import { NutritionContext } from './context/nutrition.context';
// import { ShowDispatchContext } from './context/show.context';
const finelli3 = require('./finelli3.json');

export default function ReadNutritions() {
  const nutritionDispatch = useContext(NutritionDispatchContext);
  let nutrition;

  const nutritionInfo = [
    { id: 0, name: 'id' },
    { id: 1, name: 'name' },
    { id: 2, name: 'energia, laskennallinen (kJ)', unit: 'kJ' },
    { id: 3, name: 'hiilihydraatti imeytyva (g)', unit: 'g' },
    { id: 4, name: 'rasva (g)', unit: 'g' },
    { id: 5, name: 'proteiini (g)', unit: 'g' },
    { id: 6, name: 'alkoholi (g)', unit: 'g' },
    { id: 7, name: 'kuitu, kokonais- (g)', unit: 'g' },
    { id: 8, name: 'orgaaniset hapot (g)', unit: 'g' },
    { id: 9, name: 'sokerialkoholi (g)', unit: 'g' },
    { id: 10, name: 'tarkkelys (g)', unit: 'g' },
    { id: 11, name: 'sokerit (g)', unit: 'g' },
    { id: 12, name: 'fruktoosi (g)', unit: 'g' },
    { id: 13, name: 'galaktoosi (g)', unit: 'g' },
    { id: 14, name: 'glukoosi (g)', unit: 'g' },
    { id: 15, name: 'laktoosi (g)', unit: 'g' },
    { id: 16, name: 'maltoosi (g)', unit: 'g' },
    { id: 17, name: 'sakkaroosi (g)', unit: 'g' },
    {
      id: 18,
      name: 'polysakkaridi, vesiliukoinen ei-selluloosa (g)',
      unit: 'g'
    },
    { id: 19, name: 'kuitu veteen liukenematon (g)', unit: 'g' },
    { id: 20, name: 'rasvahapot yhteensa (g)', unit: 'g' },
    { id: 21, name: 'rasvahapot monityydyttymattomat (g)', unit: 'g' },
    { id: 22, name: 'rasvahapot yksittaistyydyttymattomat cis (g)', unit: 'g' },
    { id: 23, name: 'rasvahapot tyydyttyneet (g)', unit: 'g' },
    { id: 24, name: 'rasvahapot trans (g)', unit: 'g' },
    { id: 25, name: 'rasvahapot n-3 monityydyttymattomat (g)', unit: 'g' },
    { id: 26, name: 'rasvahapot n-6 monityydyttymattomat (g)', unit: 'g' },
    {
      id: 27,
      name: 'rasvahappo 18:2 cis,cis n-6 (linolihappo) (mg)',
      unit: 'mg'
    },
    {
      id: 28,
      name: 'rasvahappo 18:3 n-3 (alfalinoleenihappo) (mg)',
      unit: 'mg'
    },
    { id: 29, name: 'rasvahappo 20:5 n-3 (EPA) (mg)', unit: 'mg' },
    { id: 30, name: 'rasvahappo 22:6 n-3 (DHA) (mg)', unit: 'mg' },
    { id: 31, name: 'kolesteroli (GC) (mg)', unit: 'mg' },
    { id: 32, name: 'sterolit (mg)', unit: 'mg' },
    {
      id: 33,
      name: 'kalsium (mg)',
      unit: 'mg',
      recommendations: [
        {
          amounts: [{ amount: 800, info: '' }],
          unit: 'mg',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    {
      id: 34,
      name: 'rauta (mg)',
      unit: 'mg',
      recommendations: [
        {
          amounts: [{ amount: 9, info: '' }],
          unit: 'mg',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    {
      id: 35,
      name: 'jodidi (jodi) (g)',
      unit: 'g',
      recommendations: [
        {
          amounts: [{ amount: 150, info: '' }],
          unit: 'yg',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    {
      id: 36,
      name: 'kalium (mg)',
      unit: 'mg',
      recommendations: [
        {
          amounts: [
            { amount: 3500, info: 'men' },
            { amount: 3100, info: 'women' }
          ],
          unit: 'g',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    {
      id: 37,
      name: 'magnesium (mg)',
      unit: 'mg',
      recommendations: [
        {
          amounts: [
            { amount: 350, info: 'men' },
            { amount: 350, info: 'women' }
          ],
          unit: 'mg',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    { id: 38, name: 'natrium (mg)', unit: 'mg' },
    { id: 39, name: 'suola (mg)', unit: 'mg' },
    {
      id: 40,
      name: 'fosfori (mg)',
      unit: 'mg',
      recommendations: [
        {
          amounts: [{ amount: 600, info: '' }],
          unit: 'mg',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    {
      id: 41,
      name: 'seleeni (g)',
      unit: 'g',
      recommendations: [
        {
          amounts: [{ amount: 60, info: 'men' }, { amount: 50, info: 'women' }],
          unit: 'yg',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    {
      id: 42,
      name: 'sinkki (mg)',
      unit: 'mg',
      recommendations: [
        {
          amounts: [{ amount: 9, info: 'men' }, { amount: 7, info: 'women' }],
          unit: 'mg',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    { id: 43, name: 'tryptofaani (mg)', unit: 'mg' },
    {
      id: 44,
      name: 'folaatti, kokonais- (yg)',
      unit: 'yg',
      recommendations: [
        {
          amounts: [{ amount: 300, info: '' }],
          unit: 'yg',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    { id: 45, name: 'niasiiniekvivalentti NE (mg)', unit: 'mg' },
    {
      id: 46,
      name: 'niasiini (nikotiinihappo + nikotiiniamidi) (mg)',
      unit: 'mg',
      recommendations: [
        {
          amounts: [{ amount: 17, info: 'men' }, { amount: 14, info: 'women' }],
          unit: 'NE',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    {
      id: 47,
      name: 'pyridoksiini vitameerit (vetykloridi) (B6) (mg)',
      unit: 'mg',
      recommendations: [
        {
          amounts: [
            { amount: 1.6, info: 'men' },
            { amount: 1.2, info: 'women' }
          ],
          unit: 'mg',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    {
      id: 48,
      name: 'riboflaviini (B2) (mg)',
      unit: 'mg',
      recommendations: [
        {
          amounts: [
            { amount: 1.5, info: 'men' },
            { amount: 1.3, info: 'women' }
          ],
          unit: 'mg',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    {
      id: 49,
      name: 'tiamiini (B1) (mg)',
      unit: 'mg',
      recommendations: [
        {
          amounts: [{ amount: 1.3, info: 'men' }, { amount: 1, info: 'women' }],
          unit: 'mg',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    {
      id: 50,
      name: 'B12-vitamiini (kobalamiini) (g)',
      unit: 'yg',
      recommendations: [
        {
          amounts: [{ amount: 2, info: '' }],
          unit: 'yg',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    {
      id: 51,
      name: 'C-vitamiini (mg)',
      unit: 'mg',
      recommendations: [
        {
          amounts: [{ amount: 75, info: '' }],
          unit: 'mg',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    {
      id: 52,
      name: 'A-vitamiini RAE (g)',
      unit: 'g',
      recommendations: [
        {
          amounts: [
            { amount: 900, info: 'men' },
            { amount: 700, info: 'women' }
          ],
          unit: 'RE',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    { id: 53, name: 'karotenoidit (g)', unit: 'g' },
    {
      id: 54,
      name: 'D-vitamiini (g)',
      unit: 'g',
      recommendations: [
        {
          amounts: [
            { amount: 10, info: 'under 60 years' },
            { amount: 20, info: 'over 60 years' }
          ],
          unit: 'yg',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    {
      id: 55,
      name: 'E-vitamiini alfatokoferoli (mg)',
      unit: 'mg',
      recommendations: [
        {
          amounts: [{ amount: 10, info: 'men' }, { amount: 8, info: 'women' }],
          unit: 'yg',
          source: 'http://www.voimaaruuasta.fi'
        }
      ]
    },
    { id: 56, name: 'K-vitamiini (g)', unit: 'g' }
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
      // const nutritionInfo = {};
      // for (const [j, part] of finelliNutrition.entries()) {
      //   nutritionInfo[j.toString()] = finelliNutrition[j];
      // }
      // console.log(nutritionInfo);
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
        // console.log(nutrition);
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
