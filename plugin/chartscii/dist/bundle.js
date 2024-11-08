var ChartsciiBundle = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var chartscii = {};

	var horizontal = {};

	var formatter = {};

	var style$1 = {};

	var colors$1 = {};

	var themes$1 = {};

	Object.defineProperty(themes$1, "__esModule", { value: true });
	const themes = {
	    default: {
	        red: [38, 5, 160],
	        green: 32,
	        yellow: [38, 5, 227],
	        blue: 34,
	        purple: 35,
	        cyan: 96,
	        pink: [38, 5, 219],
	        orange: [38, 5, 215],
	        marine: 94,
	        white: 97,
	        black: 30,
	    },
	    pastel: {
	        red: 31,
	        green: [38, 5, 49],
	        yellow: [38, 5, 228],
	        blue: [38, 5, 39],
	        purple: [38, 5, 147],
	        cyan: [38, 5, 159],
	        pink: [38, 5, 219],
	        orange: [38, 5, 209]
	    },
	    lush: {
	        red: [38, 5, 196],
	        green: [38, 5, 154],
	        yellow: [38, 5, 226],
	        blue: [38, 5, 57],
	        purple: [38, 5, 128],
	        cyan: [38, 5, 87],
	        pink: [38, 5, 198],
	        orange: [38, 5, 202]
	    },
	    standard: {
	        red: [38, 5, 9],
	        green: [38, 5, 10],
	        yellow: [38, 5, 11],
	        blue: [38, 5, 27],
	        purple: [38, 5, 105],
	        cyan: [38, 5, 123],
	        pink: [38, 5, 200],
	        orange: [38, 5, 214]
	    },
	    beach: {
	        red: '#fe4a49',
	        green: '#2ab7ca',
	        yellow: '#fed766',
	        blue: '#92C4EE',
	        pink: '#de5285',
	        purple: '#8277f9',
	        cyan: '#00FFFF',
	        orange: '#F77E02'
	    },
	    nature: {
	        red: '#c62828',
	        green: '#194d33',
	        yellow: '#f2C12e',
	        blue: '#04668c',
	        pink: '#85327d',
	        purple: '#553285',
	        cyan: '#0092b2',
	        orange: '#f27649'
	    },
	    neon: {
	        red: '#ff5733',
	        green: '#74ee15',
	        yellow: '#ffe700',
	        blue: '#001eff',
	        pink: '#f000ff',
	        purple: '#ab20fd',
	        cyan: '#4deeea',
	        orange: '#ff5f1f'
	    },
	    spring: {
	        green: "#005f73",
	        cyan: "#0a9396",
	        blue: "#94d2bd",
	        vanilla: "#e9d8a6",
	        gamboge: "#ee9b00",
	        alloy: "#ca6702",
	        rust: "#bb3e03",
	        rufus: "#ae2012",
	        auburn: "#9b2226"
	    },
	    pinkish: {
	        chocolate: "#590d22",
	        claret: "#800f2f",
	        purple: "#a4133c",
	        red: "#c9184a",
	        crayola: "#ff4d6d",
	        pink: "#ff758f",
	        salmon: "#ff8fa3",
	        cherry: "#ffb3c1",
	        pinker: "#ffccd5",
	        lavender: "#fff0f3"
	    },
	    crayons: {
	        red: "#f94144",
	        orange: "#f3722c",
	        carrot: "#f8961e",
	        coral: "#f9844a",
	        saffron: "#f9c74f",
	        pistachio: "#90be6d",
	        zomp: "#43aa8b",
	        cyan: "#4d908e",
	        gray: "#577590",
	        cerulean: "#277da1"
	    },
	    sunset: {
	        tangelo: "#ff4800",
	        cook: "#ff5400",
	        pantone: "#ff6000",
	        pumpkin: "#ff6d00",
	        safety: "#ff7900",
	        uto: "#ff8500",
	        princeton: "#ff9100",
	        peel: "#ff9e00",
	        orange: "#ffaa00",
	        yellow: "#ffb600"
	    },
	    rufus: {
	        green: '#005f73',
	        cyan: '#0a9396',
	        blue: '#94d2bd',
	        vanilla: '#e9d8a6',
	        gamboge: '#ee9b00',
	        orange: '#ca6702',
	        rust: '#bb3e03',
	        rufous: '#ae2012',
	        auburn: '#9b2226',
	    },
	    summer: {
	        green: "#b6c037",
	        yellow: "#f2ff49",
	        orange: "#f9a146",
	        red: "#ff4242",
	        pink: "#fb62f6",
	        purple: "#b060e7",
	        blue: "#645dd7",
	        cyan: "#b3fffc",
	    },
	    autumn: {
	        chocolate: '#370617',
	        rosewood: '#6a040f',
	        penn: '#9d0208',
	        engineering: '#d00000',
	        sinopia: '#dc2f02',
	        persimmon: '#e85d04',
	        princeton: '#f48c06',
	        pride: '#faa307',
	        porridge: '#ffba08',
	    },
	    mint: {
	        nyanza: "#d8f3dc",
	        celadon: "#b7e4c7",
	        celadoner: "#95d5b2",
	        minty: "#74c69d",
	        minter: "#52b788",
	        sea: "#40916c",
	        dartmouth: "#2d6a4f",
	        brunswick: "#1b4332",
	        green: "#081c15"
	    },
	    vintage: {
	        green: "#797d62",
	        moss: "#9b9b7a",
	        khaki: "#baa587",
	        desert: "#d9ae94",
	        peach: "#f1dca7",
	        sunglow: "#ffcb69",
	        yellow: "#e8ac65",
	        orange: "#d08c60",
	        chamoisee: "#b58463",
	        beaver: "#997b66"
	    },
	    sport: {
	        eerie: '#161a1d',
	        blood: '#660708',
	        cornell: '#a4161a',
	        corneller: '#ba181b',
	        imperial: '#e5383b',
	        silver: '#b1a7a6',
	        timberwolf: '#d3d3d3',
	        smoke: '#f5f3f4',
	        white: '#ffffff',
	    },
	    rainbow: {
	        amethyst: '#8e6bc7',
	        tufts: '#018bda',
	        robin: '#00d7eb',
	        forest: '#48933e',
	        apple: '#76ac2f',
	        yellow: '#ffba24',
	        bittersweet: '#fd7268',
	        cmyk: '#eb1d19',
	        crimson: '#df013c',
	        folly: '#ff0561',
	    },
	    pool: {
	        violet: '#7400b8',
	        grape: '#6930c3',
	        slate: '#5e60ce',
	        united: '#5390d9',
	        picton: '#4ea8de',
	        aero: '#48bfe3',
	        sky: '#56cfe1',
	        tiffany: '#64dfdf',
	        turquoise: '#72efdd',
	        aquamarine: '#80ffdb',
	    },
	    champagne: {
	        pink: '#eddcd2',
	        linen: '#fff1e6',
	        misty: '#fde2e4',
	        mimi: '#fad2e1',
	        cyan: '#c5dedd',
	        cream: '#dbe7e4',
	        isabelline: '#f0efeb',
	        alice: '#d6e2e9',
	        columbia: '#bcd4e6',
	        powder: '#99c1de',
	    }
	};
	themes$1.default = themes;

	var __importDefault$7 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(colors$1, "__esModule", { value: true });
	colors$1.RESET = void 0;
	const themes_1 = __importDefault$7(themes$1);
	const colors = {
	    reset: 0,
	    red: [38, 5, 160],
	    green: 32,
	    yellow: [38, 5, 227],
	    blue: 34,
	    purple: 35,
	    cyan: 96,
	    pink: [38, 5, 219],
	    orange: [38, 5, 215],
	    marine: 94,
	    white: 97,
	    black: 30,
	    ...themes_1.default
	};
	colors$1.RESET = '\x1b[0m';
	colors$1.default = colors;

	var decorators = {};

	var utils = {};

	var hasRequiredUtils;

	function requireUtils () {
		if (hasRequiredUtils) return utils;
		hasRequiredUtils = 1;
		Object.defineProperty(utils, "__esModule", { value: true });
		utils.replaceColor = utils.replaceLast = utils.getValue = void 0;
		const decorators_1 = requireDecorators();
		function getValue(txt, ...args) {
		    const sanitizedArgs = args.filter((a) => a && a !== undefined);
		    if (Array.isArray(txt) && sanitizedArgs.length > 0) {
		        return txt.map((t, i) => t + (sanitizedArgs[i] || '')).join('');
		    }
		    else if (Array.isArray(txt)) {
		        return txt.join('');
		    }
		}
		utils.getValue = getValue;
		function replaceLast(subject, search, replace) {
		    const index = subject.lastIndexOf(search);
		    if (index === -1) {
		        return subject;
		    }
		    return subject.substring(0, index) + replace + subject.substring(index + search.length);
		}
		utils.replaceLast = replaceLast;
		function replaceColor(key, color) {
		    const [code] = [...color.match(/\[[0-9;]+/gsm)];
		    const replaced = color.replace('m', `;${decorators_1.symbolMap[key]}m`);
		    const value = replaceLast(replaced, code, `${code};${decorators_1.symbolResets[key]}`);
		    return value;
		}
		utils.replaceColor = replaceColor;
		return utils;
	}

	var hasRequiredDecorators;

	function requireDecorators () {
		if (hasRequiredDecorators) return decorators;
		hasRequiredDecorators = 1;
		Object.defineProperty(decorators, "__esModule", { value: true });
		decorators.symbolsFunctions = decorators.decoratorMap = decorators.decoratorFunctions = decorators.symbolResets = decorators.symbolMap = void 0;
		const utils_1 = requireUtils();
		const decoratorMap = {
		    bold: '*',
		    dim: '~',
		    italic: '%',
		    underline: '!',
		    blink: '^',
		    invert: '@',
		    hidden: '#',
		    strikeout: '$'
		};
		decorators.decoratorMap = decoratorMap;
		decorators.symbolMap = {
		    bold: 1,
		    dim: 2,
		    italic: 3,
		    underline: 4,
		    blink: 5,
		    invert: 7,
		    hidden: 8,
		    strikeout: 9
		};
		decorators.symbolResets = {
		    bold: 22,
		    dim: 22,
		    italic: 23,
		    underline: 24,
		    blink: 25,
		    invert: 27,
		    hidden: 28,
		    strikeout: 29
		};
		const symbolsFunctions = {
		    bold: (color) => (0, utils_1.replaceColor)('bold', color),
		    dim: (color) => (0, utils_1.replaceColor)('dim', color),
		    italic: (color) => (0, utils_1.replaceColor)('italic', color),
		    underline: (color) => (0, utils_1.replaceColor)('underline', color),
		    blink: (color) => (0, utils_1.replaceColor)('blink', color),
		    invert: (color) => (0, utils_1.replaceColor)('invert', color),
		    hidden: (color) => (0, utils_1.replaceColor)('hidden', color),
		    strikeout: (color) => (0, utils_1.replaceColor)('strikeout', color),
		};
		decorators.symbolsFunctions = symbolsFunctions;
		const decoratorFunctions = {
		    bold: (txt, ...args) => symbolsFunctions.bold((0, utils_1.getValue)(txt, ...args)),
		    dim: (txt, ...args) => symbolsFunctions.dim((0, utils_1.getValue)(txt, ...args)),
		    italic: (txt, ...args) => symbolsFunctions.italic((0, utils_1.getValue)(txt, ...args)),
		    underline: (txt, ...args) => symbolsFunctions.underline((0, utils_1.getValue)(txt, ...args)),
		    blink: (txt, ...args) => symbolsFunctions.blink((0, utils_1.getValue)(txt, ...args)),
		    invert: (txt, ...args) => symbolsFunctions.invert((0, utils_1.getValue)(txt, ...args)),
		    hidden: (txt, ...args) => symbolsFunctions.hidden((0, utils_1.getValue)(txt, ...args)),
		    strikeout: (txt, ...args) => symbolsFunctions.strikeout((0, utils_1.getValue)(txt, ...args))
		};
		decorators.decoratorFunctions = decoratorFunctions;
		return decorators;
	}

	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(style$1, "__esModule", { value: true });
	const colors_1 = __importStar(colors$1);
	const decorators_1 = requireDecorators();
	const utils_1 = requireUtils();
	function hexToRgb(hex) {
	    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result
	        ? {
	            r: parseInt(result[1], 16),
	            g: parseInt(result[2], 16),
	            b: parseInt(result[3], 16)
	        }
	        : null;
	}
	function rgbToAnsi(r, g, b, txt) {
	    return `\x1b[38;2;${r};${g};${b}m${txt || ''}${txt ? colors_1.RESET : ''}`;
	}
	function makeColors(codes) {
	    return Object.keys(codes).reduce((acc, code) => {
	        let value = codes[String(code)];
	        if (Array.isArray(value))
	            value = value.join(';');
	        if (typeof value === 'string' && value.toString().includes('#')) {
	            const { r, g, b } = hexToRgb(value);
	            value = rgbToAnsi(r, g, b);
	            acc[code] = value;
	            return acc;
	        }
	        if (typeof value === 'object') {
	            acc[code] = makeColors(value);
	            return acc;
	        }
	        acc[code] = `\x1b[${value}m`;
	        return acc;
	    }, {});
	}
	function applySymbols(symbols, value, formattedColor) {
	    const keys = Object.keys(symbols);
	    return keys.reduce((acc, key) => {
	        const symbol = symbols[key];
	        const regexString = `\\${symbol}(.*)\\` + symbol;
	        const regex = new RegExp(regexString, 'gsm');
	        if (acc && acc.match(regex)) {
	            const [subject, stripped] = regex.exec(acc);
	            const replaced = decorators_1.symbolsFunctions[key](formattedColor + stripped + formattedColor);
	            acc = acc.replace(subject, replaced);
	        }
	        return acc;
	    }, value);
	}
	function makeFunctions(colors, symbols) {
	    return Object.keys(colors).reduce((acc, color) => {
	        if (typeof colors[color] === 'object') {
	            acc[color] = makeFunctions(colors[color], symbols);
	            return acc;
	        }
	        acc[color] = function (text, ...args) {
	            const formattedColor = colors[color];
	            const value = typeof text === "string" ? text : (0, utils_1.getValue)(text, ...args);
	            const formattedValue = applySymbols(symbols, value, formattedColor);
	            return `${formattedColor}${formattedValue}${colors_1.RESET}`;
	        };
	        return acc;
	    }, {});
	}
	function rgb(r, g, b) {
	    return function (text, ...args) {
	        if (typeof text === "string") {
	            return rgbToAnsi(r, g, b, text);
	        }
	        else {
	            const value = (0, utils_1.getValue)(text, ...args);
	            return rgbToAnsi(r, g, b, value);
	        }
	    };
	}
	function hex(hex) {
	    return function (text, ...args) {
	        const { r, g, b } = hexToRgb(hex);
	        if (typeof text === "string") {
	            return rgbToAnsi(r, g, b, text);
	        }
	        else {
	            const value = (0, utils_1.getValue)(text, ...args);
	            return rgbToAnsi(r, g, b, value);
	        }
	    };
	}
	function ansi(ansi) {
	    return function (text, ...args) {
	        if (typeof text === "string") {
	            return `${ansi}${text}${colors_1.RESET}`;
	        }
	        else {
	            const value = (0, utils_1.getValue)(text, ...args);
	            return `${ansi}${value}${colors_1.RESET}`;
	        }
	    };
	}
	function style(config) {
	    const { colors, theme, decorators } = config || { decorators: decorators_1.decoratorMap, colors: colors_1.default, theme: 'default' };
	    const allColors = { ...colors_1.default, ...colors };
	    const allSymbols = { ...decorators_1.decoratorMap, ...decorators };
	    const colorCodes = makeColors(allColors);
	    const themedColors = theme ? { ...colorCodes, ...colorCodes[theme] } : colorCodes;
	    if (!themedColors)
	        throw new Error(`no such theme ${theme.toString()}`);
	    const functions = makeFunctions(themedColors, allSymbols);
	    const styled = {
	        colors: themedColors,
	        symbols: allSymbols,
	        ...functions,
	        ...decorators_1.decoratorFunctions,
	        rgb,
	        hex,
	        ansi
	    };
	    return styled;
	}
	style$1.default = style;

	var __importDefault$6 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	const style_1 = __importDefault$6(style$1);
	var dist$1 = style_1.default;

	var __importDefault$5 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(formatter, "__esModule", { value: true });
	const styl3_1 = __importDefault$5(dist$1);
	class ChartFormatter {
	    colors;
	    constructor(options) {
	        this.colors = (0, styl3_1.default)({ theme: options.theme });
	    }
	    colorify(txt, color) {
	        if (color) {
	            if (color.includes('#')) {
	                return this.colors.hex(color) `${txt}`;
	            }
	            else if (color.match(/[0-9]/)) {
	                return this.colors.ansi(color) `${txt}`;
	            }
	            else if (Array.isArray(color)) {
	                return this.colors.rgb(...color) `${txt}`;
	            }
	            else {
	                return this.colors[color] `${txt}`;
	            }
	        }
	        return txt;
	    }
	    stripStyle(label) {
	        return label.replace(/\x1b\[[0-9;]*m/g, '');
	    }
	}
	formatter.default = ChartFormatter;

	var __importDefault$4 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(horizontal, "__esModule", { value: true });
	const formatter_1$1 = __importDefault$4(formatter);
	class HorizontalChartFormatter extends formatter_1$1.default {
	    options;
	    constructor(options) {
	        super(options);
	        this.options = options;
	    }
	    pad(space) {
	        return ' '.repeat(space);
	    }
	    offsetPercentage() {
	        return this.options.labels && !this.options.percentage ? 1 : 0;
	    }
	    formatStructure(structChar, color) {
	        if (!this.options.naked) {
	            const colorful = color || this.options.color;
	            if (colorful) {
	                const string = this.colorify(structChar, colorful);
	                const [color, reset] = string.split(structChar);
	                return reset + structChar + color;
	            }
	            return this.colors.colors.reset + structChar;
	        }
	        return '';
	    }
	    formatBar(point, label, barHeight, padding) {
	        const repeat = point.scaled / this.options.char.length;
	        const color = point.color || this.options.color;
	        const value = this.options.char?.repeat(repeat) + this.formatFill(point);
	        const bar = this.scaleBar(value, point.value, label, color, barHeight, padding);
	        return point.color ? this.colorify(bar, color) : bar;
	    }
	    scaleBar(bar, value, label, color, barHeight, padding) {
	        const strippedLabel = this.stripStyle(label);
	        const naked = this.options.naked ? 0 : 1;
	        const space = strippedLabel.length - naked;
	        const bars = [];
	        for (let i = 0; i < barHeight; i++) {
	            const char = this.formatStructure(this.options.structure.axis, color);
	            const pad = i !== 0 ? this.pad(space) + char : '';
	            if (this.options.valueLabels && i === 0) {
	                bars.push(pad + bar + this.pad(1) + value);
	            }
	            else {
	                bars.push(pad + bar);
	            }
	        }
	        for (let i = 0; i < padding; i++) {
	            const char = this.formatStructure(this.options.structure.axis, color);
	            const pad = this.options.labels ? this.pad(space) : '';
	            bars.push(pad + char);
	        }
	        return bars.join('\n');
	    }
	    formatFill(point) {
	        if (this.options.fill) {
	            const diff = (this.options.width - point.scaled);
	            if (this.options.scale) {
	                const width = Math.floor(this.options.width - Math.floor(point.scaled));
	                if (width > 0)
	                    return this.options.fill.repeat(width);
	            }
	            if (diff > 0) {
	                return this.options.fill.repeat(diff / this.options.fill.length);
	            }
	        }
	        return '';
	    }
	    formatPercentage(point) {
	        if (this.options.percentage) {
	            return `(${point.percentage.toFixed(2)}%)`;
	        }
	        return '';
	    }
	    formatLabelSpace(label) {
	        if (this.options.max.label) {
	            const addOne = this.offsetPercentage();
	            const space = this.options.max.label - label.length + addOne;
	            return this.pad(space);
	        }
	        return '';
	    }
	    formatChartLabel(label = '') {
	        if (this.options.colorLabels) {
	            return this.colorify(label, this.options.color);
	        }
	        return label;
	    }
	    formatChartScale(chart) {
	        const hasPadding = this.options.padding !== undefined;
	        const chartPadding = hasPadding ? this.options.padding : 0;
	        const defaultPadding = Math.floor((this.options.height - chartPadding) / chart.size);
	        const barHeight = this.options.barSize || defaultPadding || 1;
	        const padding = hasPadding ? chartPadding : defaultPadding;
	        return { padding, barHeight };
	    }
	    format(chart) {
	        const output = [];
	        output.push(this.formatChartLabel(this.options.title));
	        const { barHeight, padding } = this.formatChartScale(chart);
	        const labels = [];
	        chart.forEach((point, i) => {
	            const isLast = Number(i) === chart.size - 1;
	            const line = this.formatLine(point, barHeight, padding, isLast);
	            output.push(line);
	            labels.push(this.formatLabel(point, this.options.structure.y));
	        });
	        output.push(this.formatBottom(labels));
	        return output.join('\n');
	    }
	    formatLine(point, barHeight, padding, isLast) {
	        const label = this.formatLabel(point, this.options.structure.y);
	        const value = this.formatBar(point, label, barHeight, isLast ? 0 : padding);
	        return `${label}${value}`;
	    }
	    formatLabel(point, key) {
	        const percentage = this.formatPercentage(point);
	        const label = percentage ? `${point.label} ${percentage}` : point.label;
	        const color = point.color || this.options.color;
	        const space = this.formatLabelSpace(label);
	        const value = this.options.labels ? `${label}${space}${this.formatStructure(key)}` : this.formatStructure(this.options.structure.axis);
	        return this.options.colorLabels ? this.colorify(value, color) : value;
	    }
	    formatBottom(labels) {
	        if (!this.options.naked) {
	            const strippedLabels = labels.map(this.stripStyle);
	            const max = Math.max(...strippedLabels.map(label => label.length - 1));
	            return this.pad(max) + this.options.structure.bottomLeft + this.options.structure.x.repeat(this.options.width);
	        }
	    }
	}
	horizontal.default = HorizontalChartFormatter;

	var processor = {};

	var validator = {};

	Object.defineProperty(validator, "__esModule", { value: true });
	class ChartValidator {
	    options;
	    constructor(options) {
	        this.options = options;
	    }
	    error(text) {
	        return new Error(text);
	    }
	    validate(data) {
	        if (!Array.isArray(data))
	            throw new Error("Input data must be an array");
	        if (typeof data[0] === "string")
	            throw new Error("Input values must be numbers. e.g [1, 2, 3] or [{value: 1}, {value: 2}]");
	        if (!data.length)
	            throw new Error('No data provided');
	        if (this.options.barSize === 0)
	            throw new Error('barSize cannot be 0');
	    }
	}
	validator.default = ChartValidator;

	var __importDefault$3 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(processor, "__esModule", { value: true });
	const validator_1 = __importDefault$3(validator);
	class ChartProcessor {
	    options;
	    validator;
	    constructor(options) {
	        this.validator = new validator_1.default(options);
	        this.options = options;
	    }
	    getPointValue(point) {
	        return typeof point === "number" ? point : point.value;
	    }
	    calculateTotal(data) {
	        return data.reduce((a, p) => {
	            const value = this.getPointValue(p);
	            return a + value;
	        }, 0);
	    }
	    calculateData(data) {
	        const total = this.calculateTotal(data);
	        return data.reduce((a, p) => {
	            const value = this.getPointValue(p);
	            const label = typeof p === "number" ? p.toString() : (p.label || p.value.toString());
	            const percentage = this.percentage(value, total);
	            const percentageLength = percentage ? percentage.toFixed(2).length + 5 : 0;
	            const maxLabelLength = this.options.percentage ? label.length + percentageLength : label.length;
	            if (this.options.labels)
	                this.options.max.label = Math.max(maxLabelLength, this.options.max.label);
	            this.options.max.value = Math.max(value, this.options.max.value);
	            this.options.max.scaled = Math.max(this.scale(value), this.options.max.scaled);
	            return a + value;
	        }, 0);
	    }
	    percentage(value, total) {
	        if (this.options.percentage) {
	            const avg = value / total;
	            return avg * 100;
	        }
	        return 0;
	    }
	    scale(value) {
	        const size = this.options.orientation === 'vertical' ? this.options.height : this.options.width;
	        const { scale, max } = this.options;
	        if (scale === "auto") {
	            return Math.round((value / max.value) * size);
	        }
	        else if (typeof scale === "number" && scale > 0) {
	            return Math.round(value / scale);
	        }
	        else {
	            return value;
	        }
	    }
	    preprocess(data) {
	        const sorted = this.sort(data);
	        const key = this.options.structure.y;
	        const total = this.calculateData(data);
	        const processed = this.options.reverse ? sorted.reverse() : sorted;
	        return { processed, key, total };
	    }
	    process(data) {
	        const { processed, total } = this.preprocess(data);
	        this.validator.validate(data);
	        const chartData = new Map();
	        processed.forEach((point, i) => {
	            const { color = this.options.color, label: pointLabel, value } = typeof point === "number" ? { value: point, label: point.toString() } : point;
	            const scaled = Number(this.scale(value).toFixed(2));
	            const percentage = this.percentage(value, total);
	            const label = pointLabel || value.toString();
	            const formattedPoint = {
	                label,
	                value,
	                color,
	                scaled,
	                percentage
	            };
	            chartData.set(i, formattedPoint);
	        });
	        return [chartData, this.options];
	    }
	    sort(data) {
	        if (this.options.sort) {
	            return data.sort((a, b) => {
	                const first = this.getPointValue(a);
	                const second = this.getPointValue(b);
	                return first - second;
	            });
	        }
	        return data;
	    }
	}
	processor.default = ChartProcessor;

	var options = {};

	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.defaultOptions = void 0;
		exports.defaultOptions = {
		    percentage: false,
		    colorLabels: false,
		    sort: false,
		    reverse: false,
		    color: undefined,
		    title: '',
		    labels: true,
		    char: '█',
		    naked: false,
		    width: 100,
		    height: 10,
		    padding: 0,
		    orientation: 'horizontal',
		    theme: '',
		    scale: 'auto',
		    structure: {
		        x: '═',
		        y: '╢',
		        axis: '║',
		        topLeft: '╔',
		        bottomLeft: '╚',
		    },
		};
		class Options {
		    constructor(options) {
		        const config = {
		            ...exports.defaultOptions,
		            ...options,
		            max: {
		                label: 0,
		                value: 0,
		                scaled: 0
		            },
		            structure: {
		                ...exports.defaultOptions.structure,
		                ...options?.structure
		            }
		        };
		        return config;
		    }
		}
		exports.default = Options;
		// fills: ░, ▒, ▓
		// chars: ▀, ▁, ▂, ▃, ▄, ▅, ▆, ▇, █, ▉, ▊, ▋, ▌, ▍, ▎, ▏, ▐, ▔, ▕, ▖, ▗, ▘, ▙, ▚, ▛, ▜, ▝, ▞, ▟ 
	} (options));

	var vertical = {};

	var __importDefault$2 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(vertical, "__esModule", { value: true });
	const formatter_1 = __importDefault$2(formatter);
	class VerticalChartFormatter extends formatter_1.default {
	    chart;
	    options;
	    constructor(chart, options) {
	        super(options);
	        this.chart = [...chart.values()];
	        this.options = options;
	    }
	    format() {
	        const maxHeight = this.getMaxHeight();
	        const { barWidth, padding } = this.formatChartScale(this.chart.length);
	        const verticalChart = this.buildVerticalChart(maxHeight, padding);
	        this.formatChart(verticalChart, maxHeight, padding, barWidth);
	        return this.composeFinalChart(verticalChart, barWidth, padding);
	    }
	    formatChartScale(length) {
	        const charWidth = this.options.char.length;
	        const defaultBarSize = this.options.barSize || 1;
	        const calculatedBarWidth = Math.floor((this.options.width / (defaultBarSize * length)) / charWidth) + 1;
	        const barSize = this.options.barSize === undefined ? calculatedBarWidth : this.options.barSize;
	        const calculatedPadding = Math.round((this.options.width / this.chart.length) / charWidth);
	        const defaultPadding = calculatedPadding <= barSize ? 0 : calculatedPadding - barSize;
	        const padding = this.options.padding || defaultPadding;
	        const barWidth = barSize;
	        return { padding, barWidth };
	    }
	    getMaxHeight() {
	        const height = this.options.height + ((this.options.valueLabels && !this.options.fill) ? 1 : 0);
	        this.options.scale === "auto" ? height : this.options.scale;
	        return height;
	    }
	    isLongChar() {
	        return this.options.char.length > 1;
	    }
	    isFillLonger() {
	        const length = this.options.fill?.length || 0;
	        return length && (length > this.options.char.length);
	    }
	    getFillChar() {
	        const { fill, char } = this.getCharLengths();
	        return fill > 0 && fill < char ? this.options.fill.repeat(char) : this.options.fill;
	    }
	    getCharLengths() {
	        const char = this.options.char.length;
	        const fill = this.options.fill?.length || 0;
	        return { char, fill };
	    }
	    getCharWidth() {
	        return this.isLongChar() ? this.options.char.length : (this.isFillLonger() ? this.options.fill.length : 1);
	    }
	    getScaledBarSize(barSize) {
	        const { char, fill } = this.getCharLengths();
	        if (fill > 1 && char > 1) {
	            return barSize;
	        }
	        if (this.isFillLonger()) {
	            return Math.round(barSize / fill);
	        }
	        return barSize;
	    }
	    buildVerticalChart(maxHeight, padding) {
	        return Array(maxHeight).fill('').map(() => Array(this.chart.length).fill('').map(() => ' '.repeat(padding)));
	    }
	    formatChart(verticalChart, maxHeight, padding, barSize) {
	        this.chart.forEach((point, index) => {
	            const value = point.scaled;
	            const height = Math.round((value / maxHeight) * maxHeight);
	            const color = point.color;
	            for (let i = 0; i < maxHeight; i++) {
	                if (i === maxHeight - height - 1 && this.options.valueLabels && !this.options.fill) {
	                    const label = this.formatValueLabel(point);
	                    const space = barSize - this.stripStyle(label).length + padding;
	                    verticalChart[i][index] = label + ' '.repeat(space);
	                }
	                else if (i < maxHeight - height) {
	                    const spaces = this.formatSpace(barSize, padding);
	                    const fill = this.formatFill(barSize, padding, color);
	                    const fills = this.options.fill ? fill : spaces;
	                    verticalChart[i][index] = fills;
	                }
	                else {
	                    const bars = this.formatBar(barSize, padding, color);
	                    verticalChart[i][index] = bars;
	                }
	            }
	        });
	    }
	    formatPercentage(point) {
	        if (this.options.percentage) {
	            return `(${point.percentage.toFixed(2)}%)`;
	        }
	        return '';
	    }
	    formatSpace(barSize, padding) {
	        const character = ' ';
	        const isOdd = this.isLongChar() ? barSize * this.options.char.length : barSize;
	        return character.repeat(isOdd) + character.repeat(padding);
	    }
	    formatBar(barSize, padding, color) {
	        const character = this.options.char;
	        const barWidth = this.isFillLonger() ? barSize + (this.options.fill.length - character.length) : this.getScaledBarSize(barSize);
	        const value = character.repeat(barWidth) + ' '.repeat(padding);
	        return color ? this.colorify(value, color) : value;
	    }
	    formatFill(barSize, padding, color) {
	        const character = this.getFillChar();
	        if (character) {
	            const barWidth = this.getScaledBarSize(barSize);
	            const value = character.repeat(barWidth) + ' '.repeat(padding);
	            return color ? this.colorify(value, color) : value;
	        }
	    }
	    formatLabel(point) {
	        const label = point.percentage ? `${point.label} ${this.formatPercentage(point)}` : point.label;
	        if (this.options.colorLabels) {
	            const color = point.color || this.options.color;
	            const coloredLabel = color ? this.colorify(label, color) : label;
	            return coloredLabel;
	        }
	        return label;
	    }
	    formatValueLabel(point) {
	        const value = point.value.toString();
	        if (this.options.colorLabels) {
	            const color = point.color || this.options.color;
	            const coloredLabel = color ? this.colorify(value, color) : value;
	            return coloredLabel;
	        }
	        return value;
	    }
	    formatLabels(barSize, padding) {
	        const formatted = [];
	        this.chart.forEach((point, i) => {
	            if (this.options.labels) {
	                const formattedLabel = this.formatLabel(point);
	                const label = this.stripStyle(formattedLabel);
	                const charLength = this.getCharWidth();
	                const barWidth = this.isLongChar() ? barSize * charLength + padding : barSize + padding + Math.floor(charLength / 2);
	                const rightPad = Math.abs(barWidth - label.length);
	                const isFirst = i === 0 && !this.options.naked ? 1 : 0;
	                formatted.push(' '.repeat(isFirst) + formattedLabel + ' '.repeat(rightPad));
	            }
	        });
	        return formatted.join('');
	    }
	    formatValueLabels(barSize, padding) {
	        const formatted = [];
	        this.chart.forEach((point, i) => {
	            if (this.options.labels) {
	                const formattedLabel = this.formatValueLabel(point);
	                const label = this.stripStyle(formattedLabel);
	                const charLength = this.getCharWidth();
	                const barWidth = this.isLongChar() ? barSize * charLength + padding : barSize + padding + Math.floor(charLength / 2);
	                const rightPad = Math.abs(barWidth - label.length);
	                const isFirst = i === 0 && !this.options.naked ? 1 : 0;
	                formatted.push(' '.repeat(isFirst) + formattedLabel + ' '.repeat(rightPad));
	            }
	        });
	        return formatted.join('');
	    }
	    composeFinalChart(verticalChart, barSize, padding) {
	        const chart = verticalChart.map(row => {
	            if (!this.options.naked) {
	                return this.options.structure.axis + row.join('');
	            }
	            return row.join('');
	        });
	        if (this.options.title) {
	            chart.unshift(this.formatChartTitle());
	        }
	        if (!this.options.naked) {
	            chart.push(this.formatBottom(barSize, padding));
	        }
	        else if (this.options.naked && this.options.labels) {
	            chart.push('');
	        }
	        if (this.options.labels) {
	            chart.push(this.formatLabels(barSize, padding));
	        }
	        if (this.options.valueLabels && this.options.fill) {
	            chart.unshift('');
	            chart.unshift(this.formatValueLabels(barSize, padding));
	        }
	        return chart.join('\n');
	    }
	    formatChartTitle() {
	        const color = this.options.color;
	        return this.colorify(this.options.title, color);
	    }
	    formatBottom(barSize, padding) {
	        const charLength = this.getCharWidth();
	        const barWidth = this.getScaledBarSize(barSize);
	        const width = ((barWidth * charLength + padding) * this.chart.length) - padding;
	        return this.options.structure.bottomLeft + this.options.structure.x.repeat(width);
	    }
	}
	vertical.default = VerticalChartFormatter;

	var __importDefault$1 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(chartscii, "__esModule", { value: true });
	const horizontal_1 = __importDefault$1(horizontal);
	const processor_1 = __importDefault$1(processor);
	const options_1 = __importDefault$1(options);
	const vertical_1 = __importDefault$1(vertical);
	let Chartscii$1 = class Chartscii {
	    chart;
	    asciiChart;
	    constructor(data, options) {
	        const config = new options_1.default(options);
	        const processor = new processor_1.default(config);
	        const [chart, processedOptions] = processor.process(data);
	        this.chart = chart;
	        const chartFormatter = config.orientation === 'vertical'
	            ? new vertical_1.default(chart, processedOptions)
	            : new horizontal_1.default(processedOptions);
	        this.asciiChart = chartFormatter.format(this.chart);
	    }
	    create() {
	        return this.asciiChart;
	    }
	};
	chartscii.default = Chartscii$1;

	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	const chartscii_1 = __importDefault(chartscii);
	var dist = chartscii_1.default;

	var Chartscii = /*@__PURE__*/getDefaultExportFromCjs(dist);

	const AsciiChartPlugin = {
	    id: 'chartscii',
	    init: function (reveal) {
	        document.querySelectorAll('.chartscii').forEach((element) => {
	            const data = [1, 2, 3, 4]; // Beispiel-Daten
	            const options = {
	                title: "Chartscii",
	                width: 10,
	                theme: null,
	                color: null,
	                colorLabels: true,
	                barSize: 2,
	                orientation: "vertical"
	            };
	            
	            // Erzeuge das Diagramm und füge es dem Element hinzu
	            const chart = new Chartscii(data, options);
	            element.textContent = chart.create();
							console.log(chart.create());
	        });
	    }
	};

	return AsciiChartPlugin;

})();
window.AsciiChartPlugin = ChartsciiBundle;