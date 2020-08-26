# The 4th task from FSD by Misha Yakubchuk
Независимый, кастомизируемый плагин jQuery, реализующий функционал "бегунка"(слайдера), с MVP архитектурой.

### Демонстрация
>[Демо страница](https://fanmanutd.github.io/The-4th-task-by-Misha-Yakubchuk/output/demo-page/demo-page.html)
>
>[Больше слайдеров богу слайдеров](https://fanmanutd.github.io/The-4th-task-by-Misha-Yakubchuk/output/more-sliders/more-sliders.html)

Использованные библиотеки:
- упаковщик [parceljs](https://en.parceljs.org/)
- препроцессор-шаблонизатор [pug](https://gist.github.com/neretin-trike/53aff5afb76153f050c958b82abd9228)
- препроцессор [sass(scss)](https://sass-lang.com/)
- [typescript](https://www.typescriptlang.org/)
- фреймворк для тестирования [jest](https://jestjs.io/ru/)

### npm команды
- Установка проекта: `npm install`
- Запуск: `npm run start`
- Сборка: `npm run build`
- Тесты: `npm run test`
- Покрытие: `npm run coverage`

### Инициализация плагина
Плагин инициализируется на любом пустом div-элементе.  
Инициализация с параметрами по умолчанию:
```js
$('#selector').mySlider();
```
Инициализация с пользовательсиким параметрами:
```js
const config = {
  min: 200,
  max: 500,
  from: 250,
  to: 350,
  double: true,
};

$('#selector').mySlider(config);
```
Инициализация через data атрибуты:
```html
<div class="new-slider" data-min="100" data-max="900" data-vertical="true"></div>
```
```js
$('.new-slider').mySlider();
```
Использование публичных методов:
```js
const mySlider = $('#selector').mySlider().data('mySlider');

// Обновление состояния слайдера
mySlider.update({
  from: 250,
  to: 670,
});

// Получение состояние слайдера
const sliderData = mySlider.getData();
```
Использование коллбэков:
```js
const config = {
  onStart: function (data) {
    console.log(data.min);
  },
  
  onChange: function (data) {
    console.log(data.double);
  },
  
  onFinish: function (data) {
    console.log(data.to);
  },
};

$('#selector').mySlider(config);
```
### Javascript API

### Архитектура
Приложение спроектировано с использованием архитектуры MVP и разделено на 3 слоя: Model, View, Presenter.

Model - слой, который содержит бизнес-логику приложения и занимается расчётами, связанными только с ней(напр. валидация и расчёт новых значений).  
View - слой, который отображает приложение пользователю и реагирует на действия пользователя. Содержит расчёты, связанные только с отображением.  
Presenter - единственный слой, который знает о Model и View, является посредником между ними.

Общение между слоями происходит с использованием шаблона "Наблюдатель"(Observer). Model и View реализуют шаблон "Наблюдатель", оповещая о своём изменении всех желающих, а Presenter подписан на эти оповещения. Presenter реагирует на сообщения об изменении Model и обновляет View, а так же реагирует на сообщения от View о действиях пользователя и обновляет Model.

Так же слой View декомпозирован на MainView и SubViews. Каждый SubView отвечает за свой компонент приложения(бегунок, шкала и т.д.).
Когда пользователь совершает клик по контейнеру, в котором находится слайдер, MainView анализирует клик.  
- Если клик(или движение мыши с зажатой ЛКМ) был совершён по бегунку, треку или шкале, MainView оповещает Presenter о действии пользователя, передавая позицию клика. 
- Presenter реагирует на сообщение от MainView и передаёт позицию клика Model. 
- Model расчитывает новое значение и оповещает Presenter об изменении. 
- Presenter реагирует на сообщение от Model и вызывает метод обновления у MainView. 
- MainView обновляет необходимые SubViews на основе полученных значений. 
