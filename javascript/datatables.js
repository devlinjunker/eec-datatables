$(document).ready(function(){
	$('.datatable').not("[data-jsEnable=false]").each(function(){

		table = this;
		tablewidth = 0;

		rows = $(this).find('tbody').find('tr');

		numCols = $(this).find('thead').find('td').length;
		numRows = rows.length;
	
		headerpntr = $(this).find('thead').find('td').first();	

		rows = $(this).find('tbody').find('tr');
		cells = new Array();

		sortOrder = new Array();

		for(i = 0; i < numCols; i++){
				
			sortValues = new Array();

			if(headerpntr.find('span').length > 0){
				width = headerpntr.find('span').first().width();
			}else{
				headerpntr.html('<span>'+headerpntr.html()+'</span>');
				
				ruler = headerpntr.find('span').first();
				ruler.css('white-space', 'nowrap');
				
				width = ruler.width();
			}

			for(j = 0; j < numRows; j++){
				if(cells[j] == undefined){	
					cells[j] = $(rows[j]).find('td');
				}

				rowID = $(rows[j]).attr('id');

				cellHTML=$(cells[j][i]).html();
				cellText=$(cells[j][i]).text();
				
				if( $(cells[j][i]).find('span').length > 0){
					width = (width > $(cells[j][i]).find('span').first().width() ? width : $(cells[j][i]).find('span').first().width());
				}else{
					$(cells[j][i]).html('<span>'+cellHTML+'</span>');
					
					ruler =	$(cells[j][i]).find('span').first();
					ruler.css('white-space', 'nowrap');

					width = (width > ruler.width() ? width : ruler.width());
				}
				
				if(sortOrder[i] == undefined){
					sortOrder[i] = new Array();
					sortOrder[i].push(rowID);
					
					sortValues.push(cellText);
				}else{
					for(k = 0; k < sortOrder[i].length; k++){
						comparison = cellText < sortValues[k];
	
						if(cellText < sortValues[k]){
							sortOrder[i].splice(k,0,rowID);
							sortValues.splice(k, 0, cellText);
							break;
						}else if(cellText > sortValues[k]){
							if(k == sortOrder[i].length - 1){
								sortOrder[i].push(rowID);
								sortValues.push(cellText);
								break;
							}else{		
								continue;
							}
						}else{
							sortOrder[i].splice(k,0,rowID);
							sortValues.splice(k, 0, cellText);
							break;
						}
	
					}
				}
			}

			headerpntr.css('width',width);
			headerpntr.css('text-decoration','underline');
			headerpntr.css('cursor','pointer');
			headerpntr.append("&#x25BC;");

			sort = new function(table, sortOrder, i){
				for(k = 0; k < sortOrder[i].length; k++){
					row = $("#"+sortOrder[i][k]);
					$(table).append(row);
					row.remove();
				}

				sortOrder[i].reverse();
			};
			
			headerpntr.click(sort(table, sortOrder, i));


			tablewidth+=width;
	
			headerpntr = headerpntr.next();	
		}

		$(this).css('width',tablewidth);
	});
});
