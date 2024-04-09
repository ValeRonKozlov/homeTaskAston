// Задание 1 – Создать объект counter всеми возможными способами;

let counter = {}; // литерал обьекта
let counter2 = new Object(); // конструктор обьекта
function myObj() {
	this.isMy = true;
};
class User {
	constructor(name) {
		this.name = name;
	}
}

const objCreate = Object.create(null)
const someObj = Object.create({});
const objWithName = Object.create({}, {
	name: {
		value: "ValeRon",
		enumerable: true,
	}
})

const anoverObj = Object.assign({});


// Задание 2 – Скопировать объект counter всеми возможными способами;

// Копирование при помощи сторонних библиотек (например lodash) _.cloneDeep()
// JSON.stringyfy() > JSON.parse()
// Создание собственной функции для глубокого копирования
// Реализация паттерна проекторования прототип для классов, экземпляры которых нужно копировать
let newCounter = counter // копирование ссылки обьекта
let newCounter2 = Object.assign({}, counter); // Метод для клонирования обьекта
let newCounter3 = {...counter} // Spread оператор


// Задание 3 – Создать функцию makeCounter всеми описанными и возможными способами;

// 1. function makeCounter() {somevalue}; // именнованая функция function decloration

// 2. const makeCounter = function() {somevalue}; // преременная которая содержит функцию Function exprission

// 3. const makeCounter = () => {somevalue}; // стрелочная функция

// 4. (function makeCounter() {somevalue})() // самовызывающаяся функция IIFE

// 5. function myBind(targetFn, context) {return function() {return targetFn.apply(context, argument)}} функция высшего порядка


// Задание 4 - прочитать и описать работу глобальной функции structuredClone()

/* Функция предназначена для глубокого копирования обьекта, она копирует не только заголвки но и бесконечно вложенные массивы и обьекты, 
		клонировать цеклические ссылки, клонировать широкий спектр типов JS таких ка Date, Set, Map, Error, так же передовать любые передоваемые обьекты

		Что не может копировать: 
		вызовут DataCloneError
		- Функции structuredClone({fn : () => { }}) // ошибка
		- Dom Узлы structuredClone({el: document.body }) // ошибка
		- Дискрипторы свойст, сеттеры и геттеры structuredClone({get foo() {return 'bar'}}) //преобразуется {foo: 'bar'}
		-	Прототипы обьектов. не происходит обход цепочки прототипов. В случае клонирования экземпляра класса клонированный обьект больше не будет известен 
			как экземпляр этого класса, но все валидные свойства этого класса будут клонированы

			Полный список поддерживаемых типов
		Все, что не входит в приведенный ниже список, клонировать нельзя:

		JS Built-ins
		Array, ArrayBuffer, Boolean, DataView, Date, Error types (указанные в списке ниже), Map , Object (но только простые объекты – например, из объектных литералов), примитивные типы (за исключением symbol – number, string, null, undefined, boolean, BigInt), RegExp, Set, TypedArray

		Error types (Ошибки типизации)
		Error, EvalError, RangeError, ReferenceError , SyntaxError, TypeError, URIError

		Web/API типы
		AudioData, Blob, CryptoKey, DOMException, DOMMatrix, DOMMatrixReadOnly, DOMPoint, DomQuad, DomRect, File, FileList, FileSystemDirectoryHandle, FileSystemFileHandle, FileSystemHandle, ImageBitmap, ImageData, RTCCertificate, VideoFrame
*/


/*  Бонус Задание 1 – Написать функцию глубокого сравнения двух объектов:*/

const obj1 = { 
	here: { 
		is: "on", 
		other: "3",
		two: "3" }, 
	object: "Y" };

const obj2 = { 
	here: { 
		is: "on", 
		other: "2",
		two: "3" }, 
	object: "Y"};

const deepEqual = (obj1, obj2) => {
		if (obj1 === obj2) return true; // проверяем если это не обьекты
		if (obj1 === null || obj2 === null || typeof obj1 !== 'object' || typeof obj2 !== 'object') return false; // проверяем что одно из значений не обьект
		
		const obj1Keys = Object.keys(obj1);
		const obj2Keys = Object.keys(obj2);

		for (let i = 0; i < obj1Keys.length; i++) {
			let key = obj1Keys[i];
			if(!obj2Keys.includes(key) || !deepEqual(obj1[key], obj2[key])) {
				return false;
			}
		}
		return true;
	};

console.log(deepEqual(obj1, obj2));


/* Бонус  Задание 2 – Развернуть строку в обратном направлении при помощи методов массивов:*/

	let str = "Do, or do not. There is no 'try'!"
	function reverseStr(str) {
		return str.split('').reverse().join('');
	}

	function reverseStr2(str) {
		let arr = str.split('');
		let result = [];
		for (let i = arr.length; i >= 0; i--) {
			result.push(arr[i]);
		}
		return result.join('');
	}

	const revStr = (str) => str.split('').reverse().join('');
	const revStr2 = (str) => str.split(' ').reverse().join(' ');

	console.log(reverseStr(str));  /* !'yrt' on si erehT .ton od ro ,oD */
	console.log(reverseStr2(str)); /* !'yrt' on si erehT .ton od ro ,oD */
	console.log(revStr(str)); /* !'yrt' on si erehT .ton od ro ,oD */
	console.log(revStr2(str)); // 'try'! no is There not. do or Do,