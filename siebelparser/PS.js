/**
 * Created by vbabkin on 29.02.2016.
 * Скрипт для парсинга Siebel Output Property Set
 */

/**
 * Глобальные переменные
 */

var bAttr;
var bEscape;

var XML_CHAR_MAP = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;'
};

var XML_NAME_CHAR_MAP = {
    ' ': '_spc',
    '&': '_amp'

};

/**
 * escape Xml Name
 */
function escapeXmlName (s)
{
    return s.replace(/[ &]/g,
        function (ch) {
            return XML_NAME_CHAR_MAP[ch];
        }
    );
}

/**
 * escape Xml
 */
function escapeXml (s)
{
    return s.replace(/[<>&"']/g,
        function (ch) {
            return XML_CHAR_MAP[ch];
        }
    );
}

/**
 * Функция парсит простую строку до конца = 15*[PDQEnabledView1]28*[SI Com Account Briefing View]
 * получает исходную строку = 15*PDQEnabledView128*SI Com Account Briefing View
 * возвращает значения через "*" строку без этого означения] = PDQEnabledView1*SI Com Account Briefing View
 */
function truncLine(sSrc)
{

    var sVal="";

    // Парсим всю строку
    while (sSrc.length > 0)
    {
        // вырезаем из строки значение
        var aRes = truncValue(sSrc);
        sVal = sVal + (sVal.length?";":"") + aRes[0];
        sSrc = aRes[1];
    }

    return sVal;
}

/**
 * функция возвращает строку из символов sStr продублированнуй iNum раз
 **/
function repeatChar(sStr, iNum)
{
    var sRes = "";
    for(var i=1; i<=iNum; i++)
    {
        sRes = sRes + sStr;
    }
    return sRes;
}

/**
 * Рекурсивная функция обрабатывающая каждый child propertyset
 * получает исходную строку
 * возвращает xml сформированную из чайлда и остаток строки(информация добавленная в xml вырезана)
 * iDepth - глубина (для форматирования)
 */
function parsePS(sSrc, iDepth)
{
    //console.log(sSrc); // например = 1*2*4*Root3*5*9*Property16*Value11*2*6*Child1...2*3*6*Child2...

    var aRes;
    var sVal;
    var sXML;
    var sValue = "";

    // Получаем кол-во пропертей внутри текущей иерархии = [1]*2*4*Root3*5*9*Property16*Value11*2*6*Child1...2*3*6*Child2...
    aRes = trunc(sSrc);
    var iPS = aRes[0];
    sSrc = aRes[1];

    // Получаем кол-во чайлдов внутри текущей иерархии = 1*[2]*4*Root3*5*9*Property16*Value11*2*6*Child1...2*3*6*Child2...
    aRes = trunc(sSrc);
    var iChild = aRes[0];
    sSrc = aRes[1];

    // Получаем название иерархии = 1*2*[4*Root]3*5*9*Property16*Value11*2*6*Child1...2*3*6*Child2...
    aRes = truncValue(sSrc);
    var sPropName = bEscape?escapeXmlName(aRes[0]):aRes[0];
    sSrc = aRes[1];

    // по дефолту название тега = PropertySet
    if (sPropName == "")
    {
        sPropName = "PropertySet";
    }

    // открываем тег
    sXML = "\n" + repeatChar("\t", iDepth) + "<" + sPropName;

    // Теперь идет константа определяющая внутренности = 1*2*4*Root[3]*5*9*Property16*Value11*2*6*Child1...2*3*6*Child2...
    aRes = trunc(sSrc);
    sVal = aRes[0];
    sSrc = aRes[1];

    // Константа определяющая внутренности
    // Если = 3, значит есть Value
    // Если = 0, значит Value нет
    if (sVal == "3")
    {
        // Получаем Value
        aRes = truncValue(sSrc);
        sValue = bEscape?escapeXml(aRes[0]):aRes[0];
        sSrc = aRes[1];
    }

    // Цикл по пропертям/аттрибутам и их значениям = 1*2*4*Root3*5*[9*Property16*Value1]1*2*6*Child1...2*3*6*Child2...
    for (var i=1; i<=iPS; i++)
    {
        // получаем проперти = 1*2*4*Root3*5*[9*Property1]6*Value11*2*6*Child1...2*3*6*Child2...
        aRes = truncValue(sSrc);
        sVal = bEscape?escapeXmlName(aRes[0]):aRes[0];
        sSrc = aRes[1];

        // добавляем в XML аттрибут
        sXML = sXML + (iPS>1?"\n" + repeatChar("\t", iDepth)+"  ":" ") + sVal;

        // получаем значение проперти = 1*2*4*Root3*5*9*Property1[6*Value1]1*2*6*Child1...2*3*6*Child2...
        aRes = truncValue(sSrc);
        sVal = bEscape?escapeXml(aRes[0]):aRes[0];
        sSrc = aRes[1];

        // Если стоит флаг, анализируем значение проперти
        if (bAttr)
        {
            var re = /^[0-9]+\*/;
            // Если первые символы значения = число*
            if (re.test(sVal))
            {
                sVal = truncLine(bEscape?escapeXml(sVal):sVal);
            }
        }
        // добавляем в XML значение аттрибута
        sXML = sXML + '="' + sVal + '"';
    }

    // Окончание тега
    sXML = sXML + ((sValue == "" && iChild == 0)?"/>":">");
    // Добавляем Value в XML
    sXML = sXML + sValue;


    // Цикл по дочерним пропертям = 1*2*4*Root3*5*9*Property16*Value1[1*2*6*Child1...][2*3*6*Child2...]
    for (var j=1; j<=iChild; j++)
    {
        // Рекурсия... опасная штука конечно
        aRes = parsePS(sSrc, iDepth+1);
        sXML = sXML + aRes[0];
        sSrc = aRes[1];
    }

    // Закрываем тег, если нужно
    if (sValue > "" || iChild > 0)
    {
        sXML = sXML + ((iPS > 1 || iChild > 0)?"\n"+ repeatChar("\t", iDepth):"") + "</" + sPropName + ">";
    }

    return [sXML,sSrc];
}

/**
 * Функция достает значение в строке до * = [9]*Property16*Value11*2*6*Child1...2*3*6*Child2...
 * получает исходную строку = 9*Property16*Value11*2*6*Child1...2*3*6*Child2...
 * возвращает [значение; строку без этого означения] = 9;Property16*Value11*2*6*Child1...2*3*6*Child2...
 */
function trunc(sSrc) {

    var sVal = "";

    // очищаем исходную строку
    sSrc = sSrc.trim();

    // получаем позицию первой *
    var iPos = sSrc.indexOf("*");

    // нашли *
    if (iPos > -1)
    {

        // получаем значение
        sVal = sSrc.substr(0, iPos);

        // избавляемся от значения и * в исходной строке
        sSrc = sSrc.substr(iPos + 1);

    }
    else
    {
        sSrc = "";
    }

    // возвращаем полученное значение и исходную обрезанную строку
    // console.log("trunc=" + sVal);
    return [sVal,sSrc];
}

/**
 * Функция достает очередное значение из строки = [9*Property1]6*Value11*2*6*Child1...2*3*6*Child2...
 * получает исходную строку = 9*Property16*Value11*2*6*Child1...2*3*6*Child2...
 * возвращает [значение; строку без этого означения] = Property1; 6*Value11*2*6*Child1...2*3*6*Child2...
 */
function truncValue(sSrc, iLen)
{

    // очищаем исходную строку
    sSrc = sSrc.trim();


    // Если длину значения не передали, то ищем ее
    if (iLen === undefined)
    {
        // получаем длину значения
        var aRes = trunc(sSrc);
        iLen = aRes[0];
        sSrc = aRes[1];
    }

    if (iLen == "")
        iLen = 0;

    // получаем значение
    var sVal = sSrc.substr(0, iLen);

    // избавляемся от значения в исходной строке
    sSrc = sSrc.substr(iLen);


    // возвращаем полученное значение и исходную обрезанную строку
    //console.log("truncValue = " + sVal);
    return [sVal,sSrc];
}

module.exports = parsePS;
