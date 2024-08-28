let addRearchButton = document.getElementById("hero-btn")
let modalOverlay = document.getElementById("modal-overlay")
let nameOfItems = document.getElementById("name-of-item")
let linkToItems = document.getElementById("link-to-item")
let decsriptionOfItem = document.getElementById("description-of-items")
let emptyStateDiv = document.getElementById("empty-state-container")
let emptyStateButton = document.getElementById("empty-state-btn")
let closeIcon = document.getElementById("close-icon")
let form = document.getElementById("form")
let rightHeroContainer = document.getElementById("right-hero-content")






//Reveal Modal Overlay
addRearchButton.addEventListener("click", revealModayOverlay)
function revealModayOverlay(){
    modalOverlay.style.display = "flex"
    nameOfItems.focus()
}

emptyStateButton.addEventListener("click", revealModayOverlay)
function revealModayOverlay(){
    modalOverlay.style.display = "flex"
    nameOfItems.focus()
}

//Hide Modal Overlay
let closeModalOverlay = () =>{
    modalOverlay.style.display = "none"
}
closeIcon.addEventListener("click", closeModalOverlay)




let researchItems = []


//Collect and handle data form the data
form.addEventListener("submit", handleFormData)

function handleFormData (event){
    event.preventDefault()


    //Input Data collection
    let itemName = nameOfItems.value
    let itemLink = linkToItems.value
    let itemdescription = decsriptionOfItem.value


    const aCreatedItem = {
        itemNAME : itemName,
        itemLINK : itemLink,
        itemDESCRIPTION : itemdescription
    }

    researchItems.push(aCreatedItem)
    localStorage.setItem("itemsOfResearch", JSON.stringify(researchItems))
    form.reset()
    closeModalOverlay()
    fetchItems()

    //Form validation

}


//Fetch Data From Local Storage

function fetchItems () {
    if(localStorage.getItem("itemsOfResearch")){
        researchItems = JSON.parse(localStorage.getItem("itemsOfResearch"))
    }
    printItemsOnUI()
}
fetchItems()

function emptyState(){
    if(rightHeroContainer.innerHTML === ""){
        rightHeroContainer.append(emptyStateDiv)
    }
}

emptyState()



//Print Data Form Local Storate to UI
function printItemsOnUI (){
    
    rightHeroContainer.innerHTML = ""
    researchItems.forEach(function(item){
       let itemNameToPrint = item.itemNAME
       let itemLinkToPrint = item.itemLINK
       let itemDecriptionToPrint =  item.itemDESCRIPTION

       let researchItemDiv = document.createElement("div")
       researchItemDiv.classList.add("research-item-card")

       let titleAndDeleteContDiv = document.createElement("div")
       titleAndDeleteContDiv.classList.add("title-and-delete-container")

       let itemTitle = document.createElement("a")
       itemTitle.setAttribute("href", `${itemLinkToPrint}`)
       itemTitle.setAttribute("target", "_blank")
       itemTitle.textContent = itemNameToPrint

       let deleteIcon = document.createElement("i")
       deleteIcon.classList.add("fa-solid", "fa-trash")
       deleteIcon.setAttribute("onclick", `deleteItem('${itemLinkToPrint}')`)
       deleteIcon.style.cursor = "pointer"

       let descriptionOfItemDiv = document.createElement("div")
       descriptionOfItemDiv.classList.add("item-description")

       let descriptionText = document.createElement("p")
       descriptionText.textContent = itemDecriptionToPrint

       //Append
       descriptionOfItemDiv.append(descriptionText)

       titleAndDeleteContDiv.append(itemTitle, deleteIcon)

       researchItemDiv.append(titleAndDeleteContDiv, descriptionOfItemDiv)

       rightHeroContainer.append(researchItemDiv)

    })
}

//Delete Items From Array
function deleteItem(researchLink){
    researchItems.forEach(function(item, index){
        

        if(item.itemLINK === researchLink){
            researchItems.splice(index, 1)
        }

        
    })

    localStorage.setItem("itemsOfResearch", JSON.stringify(researchItems))
    fetchItems()

    emptyState()
}


 