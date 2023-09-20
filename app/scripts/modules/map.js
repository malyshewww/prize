// Подключение api yandex map
(function () {
	if (typeof ymaps === 'undefined') {
		return;
	}
	ymaps.ready(() => {
		var myMap = new ymaps.Map('ymap', {
			center: [56.359624, 43.832279],
			zoom: 16.5
		}, {
			searchControlProvider: 'yandex#search'
		}),
			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
				balloonContent: 'Силикатная улица, 4'
			}, {
				iconLayout: 'default#image',
				iconImageHref: '/assets/template/img/icons/location.svg',
				iconImageSize: [40, 40],
				iconImageOffset: [-30, -50]
			});
		myMap.geoObjects.add(myPlacemark);
		myMap.behaviors.disable('scrollZoom');
	});
})();