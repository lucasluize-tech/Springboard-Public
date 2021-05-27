// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
const NUM_CATEGORIES = 6
const NUM_QUESTIONS_PER_CAT = 5

function random_item(array){
    let item = array[Math.floor(Math.random()* array.length)];
    return item;
}

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    const request = await axios.get('http://jservice.io/api/categories?count=100')
    const categoryIDs = request.data.map(catIds => catIds.id) // get all ids
    const categories = [] 
    for (let i =0; i < NUM_CATEGORIES; i++){
        categories.push(random_item(categoryIDs)) // push some random ids
    }
    console.log(categories)
    return categories
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author #74119c", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    const req = await axios.get(`http://jservice.io/api/category?id=${catId}`)
    let category = req.data
    
    let clueArray = category.clues;
    let randomClues = []
    for (i=0; i < NUM_QUESTIONS_PER_CAT; i++){
        randomClues.push(random_item(clueArray))
    }

    let clues = randomClues.map( c => ({
        question: c.question,
        answer: c.answer,
        showing: null,
    }));

    return { title: category.title, clues}
    
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {

    // first lets fill the head with categories 
    let tableRow = $('<tr>');
    const tableHead = $('#table-head');
    console.log(categories)

    for ( let thTitle = 0; thTitle < NUM_CATEGORIES; thTitle++){
        let tableData = $('<th>').text(categories[thTitle].title);
        tableRow.append(tableData)
    }
    tableHead.append(tableRow)

    // lets add rows for each category

    const tableBody = $('#table-body')
    for (let row = 0; row < NUM_QUESTIONS_PER_CAT; row++){
        let tableRow = $('<tr>');
        for (let questions = 0 ; questions < NUM_CATEGORIES; questions++){
            let tableData = $('<td>').attr("id", `${questions}-${row}`).text("?");
            tableRow.append(tableData)
        }
        tableBody.append(tableRow)
    }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */


function handleClick(evt) {
    // remember that categories is an array like [{title:"", clues:[{question:"", answer:""..}]}]
    // lets get the item with id
    let id = evt.target.id;
    let [categoryID, clueID] = id.split("-");
    let clue = categories[categoryID].clues[clueID];
    console.log(clue)

    let questionOnCell = "";

    if(!clue.showing){
        clue.showing = "question"
        questionOnCell = clue.question
    }else if(clue.showing === "question") {
        clue.showing = "answer"
        questionOnCell = clue.answer
    }else{
        return
    }
    //update html

    $(`#${categoryID}-${clueID}`).text(questionOnCell);
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    $('#table-head').empty()
    $('#table-body').empty()
    categories = []
    $('#spinner').attr("style", "display:true")
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $('#spinner').attr("style", "display:none")
    fillTable();
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    showLoadingView();

    let ids = await getCategoryIds();

    for (let id of ids){
    categories.push(await getCategory(id))
    }

    hideLoadingView();
}

$('button').on('click', async function(){
    $('button').text('restart')
    setupAndStart();
    $('#table-body').on('click', 'td', handleClick)
});

/** On page load, add event handler for clicking clues */
