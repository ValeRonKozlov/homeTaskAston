/* 1. Метод запроса OPTIONS
		Метод предоставляет запрос информации об опциях соединения в цепочке запросов/ответов, идентефицируемой запрашиваемым URI(Request-URI)
		Метод позволяет клиенту определять опции и/или требования, связвнные с ресурсом, или возможностями сервера, но не производя никаких действий над ресурсом и не инициализируя загрузку
		Можно указать особый URI для обработки метода Options или * что бы указать весь сервер целиком
		Это безопасный idempotent запрос без тела
		Если ответ сервера - это не сообщение оь ошибке, то ответ НЕ ДОЛЖЕН содержать иной информации обьекта, кроме той, которую можно рассматриватькак опции соединения(например Allow можно рассматривать, 
		а Content-type - нет).
		Ответ на метод не кешируется.
		Еслти URI - *, OPTIONS * HTTP/1.1 или OPTIONS HTTP/1.1
		Если код состояния в ответе 200 то ответу следует содержать любые поля заголовка, которые указывают опциональные возможности реализуемые сервером(Public), включая любые расширения, в дополнении к соответствующим общим полям 
		или полям заголовка ответа.
		Запрос "OPTIONS * " может быть применен через прокси сервер с определением адресуемого сервера в запрашиваемом URI с пустым полем.
		Если URI не "*" OPTIONS http://exemple.org HTTP/1.1
		Если код состояния в ответе 200, то ответу следует содержать любые поля заголовков,которые указывают опциональные возможности реализуемые сервером(Allow), включая любые расширения в дополнении к соответствующим общим полям 
		или полям заголовк ответа
			HTTP/1.1 200 OK
			Allow: OPTIONS, GET, HEAD, POST
			Cache-Control: max-age=604800
			Date: Thu, 13 Oct 2016 11:45:00 GMT
			Expires: Thu, 20 Oct 2016 11:45:00 GMT
			Server: EOS (lax004/2813)
			x-ec-custom-error: 1
			Content-Length: 0
		Если OPTIONS запрос передается через прокси сервер, то последний редактирует его, исключая те опции, которые не предусмотренны возможностями этого прокси сервера
		
		По технологии CORS с помощью метода Options отправляется предварительный запрос, поэтому сервер может ответить приемлимо ли отправлять запросы этим методом
		Ответ с сервера может содеожать Accsess-Control-Allow-Methods: POST, GET, OPTIONS , он сообщает что методы POST, GET, OPTIONS являются приемлимыми для данного ресурса.
		Accsess-Control-Allow-Methods используется строго в контексте CORS.

			Date: Mon, 01 Dec 2008 01:15:39 GMT
			Server: Apache/2.0.61 (Unix)
			Access-Control-Allow-Origin: http://foo.example
			Access-Control-Allow-Methods: POST, GET, OPTIONS
			Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
			Access-Control-Max-Age: 86400
			Vary: Accept-Encoding, Origin
			Content-Encoding: gzip
			Content-Length: 0
			Keep-Alive: timeout=2, max=100
			Connection: Keep-Alive
			Content-Type: text/plain
*/

/*	HTTP/3.0
			Цель HTTP/3 является обеспечение быстрых, надежных и безопасных веб-соединений на всех типах устройств путем устранения проблем HTTP/2 связанных с транспортом.
			Для этого он использует другой сетевой протокол транспортного уровня, называемый QUIC, который работает по верх интернет-протокола User Datagram Protocol(UDP) вместо TCP
			В отличии от схемы упорядоченного обмена сообщениями TCP, UDP допускает многонаправленную широковещательную рассылку сообщений, что , по мимо прочего, помогает решать проблему 
			блокировки начала строки (HoL) на уровне пакетов.
			QUIC изменил способ установления связи между клиентом и сервером, уменшив задержку, связанную с установлением повторяющихся соединений

			HTTP/3 по синтаксису и семантике онологичен HTTP/2. Он следует той же последовательности обмена сообщениями запросов и ответов с форматом данных, который содержит методы, заголовки,
			коды состояния и тело.
			Существенное отличие заключается в порядке наложения уровнейпротокола поверх UDP.
			Порядок стека HTTP/3 показывает, что QUIC перекрывает как  уровень безопасности так и часть транспортного протокола.

			Ограничения TCP
			1. TCP может периодически зависать при передаче данных.(Скользяшее окно не работает если сегмент с меньшим порядковым номером еще не получен, даже если получены сегменты с более высоким уровнем
				это может привести к зависанию или остановке TCP- потока даже если не удалось доставить только один сегмент.Блокировка потока линии (HoL) на уровне пакета потока TCP)
			2. TCP не поддерживает мультиплексирование на уровне потока.(При использовании HTTP/2 браузер может открыть только одно TCP-соединение с сервером.Он использует одно и тоже соединение для запроса нескольких обьектов.
			При получении этих обьектов TCP сериализует все обьекты в одном потоке.В результате он понятия не имеет о секционировании сегментов TCP на уровне обьектов)
			3. TCP требует избыточной связи(При подтвеждении соединения TCP обменивается последовательностью сообщений, некоторые из которых являются избыточными, если соединение установлено с известным хостом)

			Протокол QUIC Устраняет эти ограничения, внося несколько изменений в базовый механизм передачи:
			- UDP как выбор базового протокола транспортного уровня
			- Мультеплексирование потоков и управление потоками
			- Гибкий контроль перегрузок
			- Улучшенная обработка ошибок 
			- Более быстрое рукопожатие (оптимизация механизма установления связи, что бы избежать избыточного обмена протоколами, когда два известных узла устанавливают связь друг с друугом)
			- Синтаксис и семантика (Сохраняет тот же что и в HTTP/2. HTTP/2 не может быть на прямую интегрирован с QUIC, поскольку базовое сопоставление кадров из приложения в транспорт не совместимо)
			- Сжатие (механизм сжатия заголовков QPACK который является модификацией HPACK. В QPACK заголовки HTTP могут поступать в разных потоках. QPACK использует механизм таблицы поиска для кодирования 
				и декодирования заголовков)
			- Улучшенная отправка серверов (Кадр PUSH_PROMISE отправляется с сервера через поток запросов, показывающий что будет содержаться в запросе, на который push будет ответом. Затем он отправляет 
				этот фактический ответ в новом потоке. Серверные push уведомления могут быть ограничены клиентом. Отдельно отправленные потоки можно отменить с помощью значка CANCEL_PUSH.)

				Цель HTTP/3 №2
				Улучшить общее качество работы интернета, особенно в регионах где высокоскоростной беспроводной доступ в Интернет еще не доступен.

			Интернет вещей (IoT) (Может решить проблемы беспроводного соединения с потерями для мобильных устройств которые собирают данные с подключенных датчиков)

			Ставки на рекламу в реальном времени(Когда реклама показывается в браузерах на нее делают ставки в реальном времени. Более быстрая загрузка рекламы = более быстрая загрузка страниц)

			Микросервисы (Преимущество здесь заключается не столько в пропускной способности больших данных, сколько в ускорении каждого микровоздействия)

			Веб-виртуальная реальность(VR) (Приложениям виртуальной реальности требуется большая пропускная способность для визаулизации сложных деталей вертуальной сцены)
			
			Различия в потоках и типах HTTP/3 и HTTP/2
			Потоки
			HTTP/3 позволяет использовать больше потоков чем HTTP/2 (2^62 - 1)
			QUICK считает поток закрытым, когда все данные получены и отправленные данне подтверждены узлом

			Типы HTTP фреймов
			Многие концепции кадрирования в HTTP/2 можно игнорировать в QUIC поскольку ими занимается транспорт.
			Поскольку кадры уже находятся в потоке то номер можно опустить
			Кадры не блокируют мультиплексирование(В QUIC оно проходит ниже уровнем) поэтому поддержка пакетов переменно й максимальной длины может быть удалена
			Флаг END_STREAM не требуется. Это позволяет удалить поле "Флаги" из общего макета кадра
			Эквивалентные кадры между двумя отображениями ни эдентичны
			HTTP/3 не предоставляет средств сигнализации приоритета
			QPACK это эквивалент HPACK в HTTP/3 через QUIC

			Двумя ключевыми заявленными целями QUIC являются устранение блокировки заголовка строки на уровне пакетов и уменьшение задержки в HTTP-соединениях и трафике.
			Использование UDP вместо TCP позволяет обеспечить мультиплексирование и облегченное установление соединения улучшая работу конечных пользователей в сетях низкого качества
			Аппаратная поддержка и поддержка ядра отсутствует
*/

// Idempotent Metods GET HEAD PUT DELETE OPTIONS