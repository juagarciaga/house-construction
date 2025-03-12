// const skell1 = {
//   week: 19,
//   provider: "Madenorte",
//   ccoMaterial: "MA - Material",
//   clasification: "",
//   note: "5.861",
//   createdDate: new Date(2024, 11, 18),
//   expiredDate: new Date(2024, 11, 20),
//   paymentType: "Boleto",
//   obs: "",
//   year: 2025,
//   month: 1,
//   isInRomaneio: true,
// }

// const cl = ["4. ALVENARIA - 4.2. ALVENARIA EM TIJOLO CERÂMICO 12 FUROS", "6. COBERTURAS - 6.1. ESTRUTURA PARA TELHADO EM EUCALÍPTO TRATADO"]
// const vls = [1127, 375]

// const payl = vls.map(async (v, index) => {
//   const payload = {
//     ...skell1,
//     id: uuidv4(),
//     value: v,
//     clasification: cl[index],
//   }

//   await axios.put('https://d3cntsq33m.execute-api.us-east-1.amazonaws.com/dev/romaneios', payload);
// })

// console.log({ payl });
