// 前端本地化

function Local() {
    this.defaultLang = null; // 默认语言。
    this._strings = {}; // 语言包。
};

/**
  * 获取或设置当前的语言标识符，使用 ISO 639 里的代码表示。
  * @param value  可选。设置值。
  * 如果传入参数为字符串，那么此即语言代号，记录之。
  * 如果传入的参数为 true，则启用自动模式来设置值，设置值的方式如前面所述。如果实在获取不到，那么使用预设的一个默认值。
  * 如果传入的参数为 false，那么意味着取消之前的设置，切换回默认值。
  * 当没有传入参数，或传入参数为空时，返回当前值。如果当前没有值，采用自动模式自行先设置一个值，然后再取出来
  */
Local.defaultLang = "en";
let _lang = null;
Local.lang = function (value) {
    if (arguments.length > 0 && !!value) {
        if (typeof value === "string") {
            _lang = value;
        } else if (typeof value === "boolean") {
            _lang = value ? navigator.language
                    || navigator.userLanguage
                    || navigator.browserLanguage
                    || navigator.systemLanguage
                : defaultLang;
        }
        if (!!_lang) _lang = _lang.toString().toLowerCase();
    } else {
        if (_lang == null) Local.lang(true);
    }
    return _lang;
}


/**
  * 注册一个语言包。
  * @param lang  语言编号。
  * @param value  语言包对象。
  * @param override  可选。如果需要覆盖，则为 true；否则，为 false，此为默认值。
  */
Local.prototype.regStrings = function (lang, value, override) {
    if (!lang) return;
    var key = lang.toString().toLowerCase();
    if (!value) {
        delete this._strings[key];
        return;
    }

    if (typeof value === "number"
        || typeof value === "string"
        || typeof value === "boolean"
        || typeof value === "function"
        || value instanceof Array) return;
    if (override || !this._strings[key]) {
        this._strings[key] = value;
    } else {
        var obj = this._strings[key];
        for (var prop in value) {
            obj[prop] = value[prop];
        }
    }
}
/**
  * 获取或设置某一特定语言的某一文本。
  * @param lang  语言编号。
  * @param key  文本对应的 Key。
  * @param value  可选。设置文本值。
  */
Local.prototype.specificString = function (lang, key, value) {
    if (arguments.length > 2) { //设置
        var strings = this._getStrings(lang, true);
        strings[key] = value;
    }

    return this._getStrings(lang)[key];//获取
}

/**
  * 获取或设置某一本地文本。
  * @param key  文本对应的 Key。
  * @param value  可选。设置文本值。
  */
Local.prototype.localString = function (key, value) {
    return arguments.length > 1 ? this.specificString(Local.lang(), key, value) : this.specificString(Local.lang(), key);
}

/**
  * Gets the string in local or specific language.
  * @param key  The template key.
  * @param useKeyInsteadOfUndefined  true if use key as result instead of undefined; otherwise, false.
  * @param lang  The opitonal ISO 639 code string for a sepecific one.
  */
Local.prototype.getString = function (key, useKeyInsteadOfUndefined, lang) {
    var langCode = !lang ? Local.lang() : lang;
    if (!langCode || langCode == "") langCode = this.defaultLang;
    var str = this.specificString(langCode, key);
    if (!!str || typeof str !== "undefined") return str;
    while (langCode.lastIndexOf("-") > 1) {
        langCode = langCode.substring(0, langCode.lastIndexOf("-"));
        str = this.specificString(langCode, key);
        if (!!str || typeof str !== "undefined") return str;
    }
    return useKeyInsteadOfUndefined ? key : undefined;
}




// 辅助函数
Local.prototype._getStrings = function (lang, init) {
    if (lang == null) lang = Local.lang();
    if (!lang) return {};

    lang = lang.toString().toLowerCase();
    if (!this._strings[lang]) {
        if (init == true) {
            this._strings[lang] = {};
            return this._strings[lang];
        }

        return {};
    }

    return this._strings[lang];
}





//Create a Local instance.
var local = new Local();

// Set up an English language pack.
var lp_en = {
    greetings: "Hello!",
    goodbye: "Bye!"
};
local.regStrings("en", lp_en);

// Set up an Simplified Chinese language pack.
var lp_hans = {
    greetings: "你好！",
    goodbye: "再见！"
};
local.regStrings("zh-Hans", lp_hans);
local.regStrings("zh-CN", lp_hans);
local.regStrings("zh-SG", lp_hans);
console.log(local.getString("goodbye"));  // "再见！"
console.log(local.getString("hello"));  // Undefined
