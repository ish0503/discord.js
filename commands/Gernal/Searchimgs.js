const { SlashCommandBuilder } = require("discord.js");
const request = require('request');
const cheerio = require('cheerio');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("이미지검색")
    .setDescription("이미지 검색을 할수 있어요")
    .addStringOption(options => options
        .setName("검색할것")
        .setDescription("검색 단어 입력해주세요.")
        .setRequired(true)
    ),
    
    /**
     * 
     * @param {import(*discord.js*).ChatInputCommandInteraction} interaction
     */
    async execute(interaction){
        await interaction.deferReply();
        const args = interaction.options.getString("검색할것")
      function req(url) {  
        return new Promise(function(resolve, reject) { 
          request.get({    
            url : url,  
          }, function(err, reponse, body) {   
            if(err) {   
              reject(err);   
              return;  
            }    
            let bodyHtml = body;  
            bodyHtml = bodyHtml.replace(/[\w\W]*<body/g, '<body');   
            console.info(`request success ${url}`);   
            resolve(bodyHtml);  
          }); 
        });
      }
      function parse(html) { 
        let items = []; 
        let pages = []; 
        let $ = cheerio.load(html);
        let $tds = $('.images_table tbody td'); 
        console.info(`parse1 start : ${$tds.length}`);
        for(let i = 0; i < $tds.length; i++) {   
          let $td = $tds.eq(i);   
          let link = $td.find("a").prop('href').replace(/(\/url\?q=)/g, '');  // delete => /url?q=  
          let imageSrc = $td.find("a img").prop('src'); 
          let desc = $td.html();  
          desc = desc.replace(/(<a[\w\W]*<\/a>|<cite[\w\W]*<\/cite>|<b>[\w\W]*<\/b>)/g, '').split('<br>');  
          let obj = {   
            link : decodeURIComponent(link),   
            imageSrc : decodeURIComponent(imageSrc),    
            title : $td.html(desc[2]).text()  
          };    
          items.push(obj); 
        }  
        let $anchors = $('#foot table a'); 
        for(let i = 0; i < $anchors.length && i < 9; i++) {   
          let a = $anchors.eq(i); 
          pages.push(a.prop('href')); 
        } 
        return {  
          items : items,    pages : pages 
        };
      }
      let google = 'https://www.google.com';
      async function search(keyword) {  
        keyword = encodeURIComponent(keyword);
        //지난1일 qdr:d
        //지난1주 qdr:w  
        //지난1개월 qdr:m 
        //지난1년 qdr:y 
        //큰사이즈 이미지 isz:l
        //중간사이즈 이미지 isz:m 
        //얼굴 itp:face
        //사진 itp:photo
        // let url = `${google}/search?q=${keyword}&tbm=isch&tbs=qdr:w,isz:l,itp:photo`; 
        // let url = `${google}/search?q=${keyword}&tbm=isch&tbs=isz:l,itp:photo`;
        // let url = `${google}/search?q=${keyword}&tbm=isch&tbs=qdr:w,isz:l`; 
        // let url = `${google}/search?q=${keyword}&tbm=isch&tbs=qdr:w,itp:photo`;  
        // let url = `${google}/search?q=${keyword}&tbm=isch&tbs=qdr:w,itp:face`; 
        // let url = `${google}/search?q=${keyword}&tbm=isch&tbs=qdr:w,isz:l,itp:face`; 
        // let url = `${google}/search?q=${keyword}&tbm=isch&tbs=qdr:w,itp:photo`; 
        // let url = `${google}/search?q=${keyword}&tbm=isch&tbs=qdr:w,itp:photo`; 
        let url = `${google}/search?q=${keyword}&tbm=isch&tbs=qdr:y`;  
        let bodyHtml = await req(url);
        let data = parse(bodyHtml); 
        let itemList = data.items; 
        
        //다른 페이지 검색 
        while(data.pages.length) {  
          url = google + data.pages.shift();  
          let nextHtml = await req(url);  
          let nextData = parse(nextHtml);  
          itemList = itemList.concat(nextData.items); 
        } 
        return itemList;
      }
      
        let items = await search(args); 
        console.log(items.length); 
        console.log(items[0]);
        interaction.editReply(items[0])
        
    }
}
