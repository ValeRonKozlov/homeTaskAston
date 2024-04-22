/* 1
let promiseTwo = new Promise((resolve, reject) => {
	resolve("a");
});

promiseTwo
.then((res) => {
	return res + "b";
})
.then((res) => {
	return res + "с";
})
.finally((res) => {
	return res + "!!!!!!!";
})
.catch((res) => {
	return res + "d";
})
.then((res) => {
	console.log(res);
});

		Promise выполнится и в стек добавится "a", затем добавится 'b' так как Promise выполнился без ошибки, затем добавится "c" так же потому что promise выполнился,
		Finally проигнорируется так как он ничего не выполняет, cathc так же проигнорируется так как он должен отловить ошибку,но её нет, 
		и последним выполнится console.log()
		В консоле будет ответ "abc".
*/

/* 2
function doSmth() {
	return Promise.resolve("123");
}

doSmth()
.then(function (a) {
	console.log("1", a); //
	return a;
})
.then(function (b) {
	console.log("2", b);
	return Promise.reject("321");
})
.catch(function (err) {
	console.log("3", err);
})
.then(function (c) {
	console.log("4", c);
	return c;
});

	В функции doSmth Promise выполнится и в первом then попадет значение 123 оно выведется в консоль и прокинется дальше, затем в переменную  b попадет значение 123
	оно выведется в консоль, но из этой функции веренется новый promiise который выдаст reject с значением 321, catch его отловит и выведет в консоль 321, затем в переменную 
	c попадет значение undefined так как из функции с переменной b не вернулось значение и переменной с неоткуда его взять, then отработает и выведет в консоль undefined

	Ответ будет:
	1 123
	2 123
	3 321 
	4 undefined

*/

/* 3 Напишите функцию, которая будет проходить через массив целых чисел и выводить индекс каждого элемента с задержкой в 3 секунды.
		Входные данные: [10, 12, 15, 21]
*/
// const arr = [10, 12, 15, 21];

// ForEach method

// const showIndex = (arr) => {
// arr.forEach((el, i) => {
// 	const timeout = (i + 1) * 3000;
// 		setTimeout(() => {
// 			console.log(`Index: ${i} >> Element: ${el}`);
// 		}, timeout);
// 	});
// }
// showIndex(arr);

// For Loop

// const showIndex2 = (arr) => {
// for (let i = 0; i < arr.length; i++) {
// 	const timeout = (i + 1) * 3000;
// 		setTimeout(() => {
// 			console.log(`Index: ${i} >> Element: ${arr[i]}`)
// 		}, timeout)
// 	}
// }
// showIndex2(arr);

// Array.map 

// const showIndex3 = (arr) => {
// 	arr.map((el, i) => {
// 		const timeout = (i + 1) * 3000;
// 		setTimeout(() => {
// 			console.log(`Index: ${i} >> Element: ${el}`)
// 		}, timeout)
// 	})
// }
// showIndex3(arr);

// Рекурсивная функция 

// function showIndexWithDelay(arr, index = 0) {
// 	if (index < arr.length) {
// 		setTimeout(() => {
// 			console.log(`Index: ${index} >> Element: ${arr[index]}`)
// 			showIndexWithDelay(arr, index + 1);
// 		}, 3000)
// 	}
// } // эта функция рекурсивно вызывает себя с инкрементированием индекса и установкой таймера в 3 сек
// showIndexWithDelay(arr)


// 4 Прочитать про Top Level Await (можно ли использовать await вне функции async)
/*
		!! Вопрос: можно ли использовать await вне функции async? 
			Как правило await можно использовать ТОЛЬКО внутри функции async.
			Однако, некоторые браузеры предоставляют возможность top-level await, когда разрешено использовать await на самом верхнем глобальном уровне

		Await Так же можно использовать вне асинхронной функции в модулях, эта возможность появилась в ES2022

		Цель заключается в превращении ES модулей в некое подобие асинхронных функций. Это позволит модулям получать готовые к использованию ресурсы и блокировать модули импортирующие их.
		Модули, которые импортируют ожидаемые ресурсы, смогут  запускать выполнение кода только после получения ресурсов их предварительной подготовки  к использованию.

		Если попытаться использовать ключевое слово await за пределами асинхронной функции, то получим синтаксическую ошибку. Во избежании этого используют IIFE(немедленно вызываемое функциональное выражение)

		Глобальный await работает только с ES модулями. Используемые зависимости должны быть указаны явно

		!Вопрос: Случаи использования глобального await?
			- Динамический путь зависимости(Это позволяет модулям использовать значение среды выполнения для вычисления путей зависимостей и может быть полезным для разделения разработки/продакшн код,
			интернационализации, разделение кода в зависимости от среды выполнения(браузер, Node.js))
			- Инициализация ресурсов(Это помогает модулям получать готовые к использованию ресурсы и выбрасывать исключения в случае, когда модуль не может быть использован. Такой подход может использоваться для подстраховки) 
			- Запасной вариант(await может использоваться для загрузки зависимости с реализацией запосного варианта. Если импорт из одного места провалится, осуществится импорт из другого места)


		!Вопрос: "Глобальный" await может блокировать выполнение кода?
			Поскольку дочерние узлы(модули) имеют возможность выполнения, блокировка кода в конечном счёте, отсутствует
		!Вопрос: "Глобальный" await может блокировать получение ресурсов?
			"Глобальный" await использется на стадии выполнения графа модулей. На данном этапе все ресурсы получены и связаны, поэтому риска блокировки получения ресурсов не усматривается
		
*/

/*	БОНУС ЗАДАНИЕ 
	Необходимо реализовать функцию fetchUrl, которая будет использоваться следующим образом.
	Внутри fetchUrl можно использовать условный метод fetch, который просто возвращает
	Promise с содержимым страницы или вызывает reject 
	fetchUrl('https://google/com&#39;)
	.then(...)
	.catch(...) // сatch должен сработать только после 5 неудачных попыток
	получить содержимое страницы внутри fetchUrl
*/

// async function fetchUrl(url) {
// 	let attempt = 1;
// 	const MAX_ATTEMPTS = 5;

// 	while (attempt <= MAX_ATTEMPTS) {
// 		try {
// 			const response = await fetch(url);
// 			if(response.ok) {
// 				return response.text();
// 			} else {
// 				throw new Error(`HTTP error ${response.status}`)
// 			}
// 		} catch (error) {
// 			console.log(`Failed to fetch with error ${error.message}, Attempt: ${attempt}!`);
// 			attempt++;
// 		}
// 	}
// 	throw new Error(`Fetch failed after: ${MAX_ATTEMPTS} attempts!`)
// }

// function fetchUrl(url, attempts = 5) {
// 	fetch(url)
// 		.then(response => {
// 			if(response.ok) {
// 				return response.text()
// 			}
// 			throw new Error(`HTTP error ${response.status}`)
// 		})
// 		.catch(error => {
// 			if (attempts >= 1) {
// 				console.log(`Failed to fetch with error ${error.message}, Attempts remaining: ${attempts}!`);
// 				fetchUrl(url, attempts - 1);
// 			} else {
// 				console.log(`${error.message}`)
// 			}
// 	})
// }

	// const fetchUrl = (url, attempts = 5) => {
	// 	return new Promise((resolve, reject) => {
	// 		fetch(url)
	// 			.then(response => {
	// 				if(response.ok) {
	// 					return response.text()
	// 				}
	// 				throw new Error(`HTTP error ${response.status}`)                                                                   
	// 			})
	// 			.then(content => resolve(content))
	// 			.catch(error => {
	// 				if (attempts >= 1) {
	// 					console.log(`Failed to fetch with error ${error.message}, Attempts remaining: ${attempts}!`);
	// 					fetchUrl(url, attempts - 1).then(resolve, reject);
	// 				} else {
	// 					reject(error)
	// 				}
	// 			})
	// 	})
	// }

// fetchUrl('https://google/com&#39')
// 	.then(content => {
// 		console.log(content);
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	})



/*
	! Вопрос: Что такое цепочка прототипов? 
	Каждый обьект в JS имеет скрытое cвойство [[Prototype]]. Данное свойство может ссылаться на обьект или может быть равно null

	Например у нас есть массив.Мы вызываем у него какой то метод. у Мссива есть скрытое свойство [[Prototype]] он ссылается на Второе звено в цепочке Array.prototype. Если метода там нет то он переходит на следующее звено Object.prototype если и там нет то он упирается в null  и нам вернется undefined

	!Вопрос Что такое JS? 
	Это синхронный, однопоточный язык программирования с возможностью выполнения асинхронных задач при помощи Event loop
*/ 