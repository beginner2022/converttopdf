// ===============================
// ConvertToPDF 2.0
// Tool Database
// ===============================

const tools = [

{
name:"Merge PDF",
icon:"📄",
category:"pdf",
url:"/tools/merge-pdf/"
},

{
name:"Split PDF",
icon:"✂️",
category:"pdf",
url:"/tools/split-pdf/"
},

{
name:"Compress PDF",
icon:"🗜️",
category:"pdf",
url:"/tools/compress-pdf/"
},

{
name:"Rotate PDF",
icon:"🔄",
category:"pdf",
url:"/tools/rotate-pdf/"
},

{
name:"JPG to PDF",
icon:"🖼️",
category:"pdf",
url:"/tools/jpg-to-pdf/"
},

{
name:"Resize Image",
icon:"📷",
category:"image",
url:"/tools/resize-image/"
},

{
name:"Passport Photo",
icon:"🪪",
category:"image",
url:"/tools/passport-photo/"
},

{
name:"Signature Resize",
icon:"✍️",
category:"image",
url:"/tools/signature-resize/"
},

{
name:"SSC Photo Tool",
icon:"🏛️",
category:"government",
url:"/tools/ssc-photo/"
},

{
name:"NEET Photo Tool",
icon:"🎓",
category:"government",
url:"/tools/neet-photo/"
}

];

// ===============================
// Card Generator
// ===============================

function createCard(tool){

return `

<div class="tool-card">

<div class="tool-icon">

${tool.icon}

</div>

<h3>${tool.name}</h3>

<p>

Free online ${tool.name} tool.

</p>

<a class="btn btn-primary" href="${tool.url}">

Open Tool

</a>

</div>

`;

}

// ===============================
// Load Cards
// ===============================

function loadTools(){

const pdf=document.getElementById("pdf-tools");

const image=document.getElementById("image-tools");

const govt=document.getElementById("government-tools");

const popular=document.getElementById("popular-tools");

tools.forEach(tool=>{

if(tool.category==="pdf"){

pdf.innerHTML+=createCard(tool);

}

if(tool.category==="image"){

image.innerHTML+=createCard(tool);

}

if(tool.category==="government"){

govt.innerHTML+=createCard(tool);

}

});

tools.slice(0,6).forEach(tool=>{

popular.innerHTML+=createCard(tool);

});

}

loadTools();
