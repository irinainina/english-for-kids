ветка master - разработка  
ветка netlify - деплой  
демо: https://english-for-kids.netlify.com/

# English for kids

| Deadline         | Repository name| Branch name |
| ---------------- | ----------- | ----------- |
| 05.04.2020 23:59 | english-for-kids    | dev    |

**English for kids** - приложение для изучения английских слов детьми.

## Структура приложения

1. Главная страница приложения
- на главной странице приложения размещаются ссылки на страницы с категориями слов. 
- минимальное количество категорий - восемь. 
- каждая ссылка содержит тематическую картинку и название категории.
- ссылки дублируются в выезжающем боковом меню, которое открывается и скрывается по клику на иконку в левом верхнем углу страницы. 
  
2. Страница категории 
- страница категории содержит карточки со словами соответствующей тематики. 
- минимальное количество карточек со словами в каждой категории - восемь.   
- каждая карточка содержит тематическую картинку и слово на английском языке.  
- при клике по карточке звучит произношение слова на английском языке.  
- на каждой карточке размещается кнопка "Translate". При клике по этой кнопке карточка переворачивается. На оборотной стороне карточки размещается перевод слова.   
[Demo](https://codepen.io/irinainina/full/JjdNYxz) - поворот карточки (без клика по кнопке).
- обратный поворот карточки на лицевую сторону происходит автоматически, когда курсор мыши перемещается за её границы.
- на каждой странице с изучением групп слов присутствует кнопка "Play".  
[Demo](https://english-for-kids.netlify.com/) страницы категории

3. Страница со статистикой 
- описание страницы находится [в критериях оценивания](https://github.com/irinainina/english-for-kids#страница-статистики)

## Работа приложения
Приложение работает [в режиме тренировки](https://github.com/irinainina/english-for-kids#режим-тренировки) и [в режиме игры](https://github.com/irinainina/english-for-kids#режим-игры).  
Описание работы приложения в данных режимах находится в критериях оценивания. 

## Требования к репозиторию
- для разработки приложения используйте собственный приватный репозиторий
- название репозитория: **english-for-kids**, название ветки, в которой ведётся разработка - **dev**, ветка **master** пустая, содержит только READEME.md
- история коммитов должна отображать процесс разработки приложения. [Требования к коммитам](https://docs.rs.school/#/git-convention)
- после окончания разработки или при наступлении дедлайна, создайте pull request из ветки dev в ветку master. [Требования к pull request](https://docs.rs.school/#/stage2?id=Описание-pull-request-должно-содержать-следующую-информацию)
- для проверки кода приложения ментором, вам нужно будет добавить его в ревьюеры
- демо-версия приложения размещается на `https://www.netlify.com/`, либо на другом подобном хостинге
- для проверки приложения в ходе кросс-чека, ссылку на демо-версию приложения необходимо будет добавить в rss-app

## Технические требования
- работа приложения проверяется в браузере Google Chrome последней версии
- использование jQuery не допускается
- нельзя использовать Angular/React/Vue 
- можно использовать Bootstrap и другие CSS фреймворки
- можно использовать CSS preprocessors

## Требования к качеству кода 
- не допускайте дублирования кода
- разбейте js-код на модули
- используйте webpack

## Требования к оформлению приложения
- минимальная ширина, при которой приложение отображается корректно – 320 рх
- так как приложение предназначено для обучения детьй, в том числе и тех, которые ещё не умеют читать, все надписи необходимо продублировать картинками или иконками (если это возможно)
- плавная анимация (в разумных пределах), интересный и уместный дизайн, большие и удобные кнопки, красочные иконки, красивые картинки, светлые и яркие тона 
- позаботьтесь об интерактивности кликабельных элементов - изменение внешнего вида при наведении, в активном и неактивном состоянии

## Критерии оценки:
**Максимальный балл за задание: 160 баллов**  

### Базовый уровень: 50 баллов  

- **Вёрстка, дизайн, UI главной страницы приложения: (+10)**
  - выполнены требования к оформлению приложения
  
- **Вёрстка, дизайн, UI выезжающего меню: (+10)**
  - выполнены требования к оформлению приложения
  - меню появляется и скрывается плавно
  - ссылки в меню рабочие и ведут на страницы с категориями слов
  - выезжающее меню присутствует на всех страницах приложения.
  
- **Вёрстка, дизайн, UI страницы категории: (+10)**
  - выполнены требования к оформлению приложения

- **Реализован режим тренировки: (+20)**
  - по 10 баллов за каждый полностью реализованный пункт режима тренировки
  
### Режим тренировки:

1. При клике по карточке звучит произношение слова на английском языке.
2. При клике по кнопке "Translate" карточка поворачивается, на обратной стороне указан перевод слова. Когда курсор мыши перемещается за границы карточки, она автоматически поворачивается на лицевую сторону.

### Средний уровень 

- **Реализован режим игры: (+80)**
  - по 10 баллов за каждый полностью реализованный пункт режима игры
  
### Режим игры: 

1. Кликом по кнопке "Play" включается режим игры. В режиме игры указанные выше возможности режима тренировки отключаются, кнопка "Translate" и текст слова скрываются, на карточках остаются только картинки. 
2. После клика по кнопке "Play" звучит произношение рандомного слова из тех, что находятся на странице, на английском языке. 
3. Надпись на кнопке "Play" меняется на симовол "Повторить", может измениться внешний вид кнопки. Если пользователь кликнул на кнопку "Повторить", произношение слова звучит ещё раз. 
4. Если пользователь кликнул по карточке с неправильным ответом, раздаётся звуковой сигнал "error". 
5. Если пользователь кликнул по карточке с правильным ответом, раздаётся звуковой сигнал "correct" и после него звучит произношение рандомного слова из тех, которые ещё не звучали. 
6. Карточка с угаданным словом становится неактивной, при этом изменяется её внешний вид.
7. В режиме игры каждый клик по активной карточке является правильным или неправильным ответом. Эти ответы отображаются в виде звёздочек разного цвета в шкале с рейтингом, которая в режиме игры появляется сверху над карточками. Если звёздочек слишком много и шкала заполнена ими полностью, предыдущие звёздочки скрываются, а новые продолжают добавляться.
8. После окончания игры, когда угаданы все слова в категории: 
    - если все слова угаданы правильно, звучит сигнал "success", карточки со словами скрываются, на странице отображается радостный смайлик
    - если при угадывании слов были ошибки, звучит сигнал "failure", карточки со словами скрываются, на странице отображается грустный смайлик и количество допущенных ошибок.
    - приложение автоматически перенаправляет на главную страницу со списком категорий
   
### Extra scope
- **Реализована страница статистики: (+40)**
  -  по 10 баллов за каждый полностью реализованный пункт описания страницы статистики
  
### Страница статистики
  
1. Страница со статистикой содержит таблицу с перечнем всех категорий, всех слов в каждой категории, перевод каждого слова. 
2. Возле каждого слова указывается статистика - сколько раз данное слово угадывали (угадывание слов происходит в режиме игры), сколько ошибок при этом допустили, процент ошибок по каждому слову. 
3. Есть возможность сортировки столбцов таблицы по алфавиту, для числовых значений - по их величине. Сортировка может происходить в прямом и обратном порядке. 
4. На странице со статистикой размещена кнопка "Repeat difficult words". При клике по этой кнопке открывается страница изучения слов с наибольшим процентом ошибок.

## Штрафные баллы
- меньше восьми категорий, меньше восьми слов в каждой категории: -5 баллов за каждую отсутствующую или неполную категорию  
- ошибки в работе приложения: -5 баллов за каждую ошибку

## Материалы

### Информационные ресурсы
`https://ru.forvo.com/` - получить английское произношение слова  
`https://dictionary.cambridge.org/` - получить английское произношение слова

### Cross-check
- инструкция по проведению cross-check: https://docs.rs.school/#/cross-check-flow

### Документ для вопросов
- документ для вопросов, связанных с выполнением задания: 

