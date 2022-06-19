const cepInput = document.querySelector('#cepNumber')
const cepForm  = document.querySelector('.container-cep')
const loadingCep = document.querySelector('.loading-cep')
const modalInfoCep = document.querySelector('#modalInfoCep')

cepForm.addEventListener('submit', (e) => {
  e.preventDefault()
  apiCepData(cepInput.value)

  cepForm.classList.add('disabled')
  loadingCep.classList.add('active')
  
  setTimeout(() => {
    loadingInfoCep()
  }, 3000)
})

function loadingInfoCep(){
  loadingCep.classList.remove('active')
  modalInfoCep.classList.add('active')
}

async function apiCepData(cep){
  
  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`
  const cepData = await fetch(apiUrl)
  .then(res => res.json())
  .then(data => data)

  handleCepResultInfo(cepData)
  
  if(cepData.hasOwnProperty('erro')){
    modalInfoCep.innerHTML = `
  
    <div class="error-message">
      <p>Endereço não encontrado!</p>
  
      <button id="btnInitial" >inserir novamente</button>
    </div>
  
    `
    const btnInitial = document.querySelector('#btnInitial')
  
    btnInitial.addEventListener('click', () => {
      modalInfoCep.classList.remove('active')
      cepForm.classList.remove('disabled')
    })
  }
}

function handleCepResultInfo(cepData){
  

  const infoCep = {
    cep: cepData.cep,
    estado: cepData.uf,
    cidade: cepData.localidade,
    bairro: cepData.bairro,
    rua: cepData.logradouro
  }

  const htmlStructure =  `

    <h2>Resultados do CEP:</h2>
    <div class="info-cep">
      <p>cep: <span>${infoCep.cep}</span></p>
      <p>estado: <span>${infoCep.estado}</span></p>
      <p>cidade: <span>${infoCep.cidade}</span></p>
      <p>bairro: <span>${infoCep.bairro}</span></p>
      <p>rua: <span>${infoCep.rua}</span></p>
    </div>
  
    <button id="btnInitial" >inserir novamente</button>
  `

  modalInfoCep.innerHTML = htmlStructure

  const btnInitial = document.querySelector('#btnInitial')

  btnInitial.addEventListener('click', () => {
    modalInfoCep.classList.remove('active')
    cepForm.classList.remove('disabled')
  })
}



