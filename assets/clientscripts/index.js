
$(document).ready(function () {

	$("#myInput").on("keyup", function () {
		var value = $(this).val().toLowerCase();
		$("#myTable tr").filter(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});

	$('#findBtn').click(function () {
		console.log($('#findInput').val());
		$('#currentFindValue').val($('#findInput').val());
		startAction(1);
	});

	$('#pageSizeOption button').on('click', function () {
		console.log('Set page size to'+ $(this).text());
		$('#pageSizeBtn').text('Page size ' + $(this).text());		
		$('#currentPageSize').val($(this).text());
		startAction(2);
	});

	$('#paging button').on('click', function () {
		console.log('Set current page to'+ $(this).val());
		$('#currentPage').val($(this).val());
		startAction(3);		
	});

	function startAction(actionType)
	{
		console.log('Start action: '+ actionType);		
		console.log('Page: '+$('#currentPage').val());
		console.log('Page size: '+$('#currentPageSize').val());
		console.log('Find value: '+$('#currentFindValue').val());

		$('#actionType').val(actionType);
		$('#actionForm').submit();
	}
});