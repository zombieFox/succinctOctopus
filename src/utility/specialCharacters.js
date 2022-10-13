export const specialCharacters = (string) => {

  const characters = [
    { glyph: '\"', entityName: '&quot;' }, // quotation mark
    { glyph: '\'', entityName: '&apos;' }, // apostrophe
    { glyph: '&', entityName: '&amp;' }, // ampersand
    { glyph: '<', entityName: '&lt;' }, // less-than
    { glyph: '>', entityName: '&gt;' }, // greater-than
    { glyph: 'Œ', entityName: '&OElig;' }, // capital ligature OE
    { glyph: 'œ', entityName: '&oelig;' }, // small ligature oe
    { glyph: 'Š', entityName: '&Scaron;' }, // capital S with caron
    { glyph: 'š', entityName: '&scaron;' }, // small S with caron
    { glyph: 'Ÿ', entityName: '&Yuml;' }, // capital Y with diaeres
    { glyph: 'ƒ', entityName: '&fnof;' }, // f with hook
    { glyph: 'ˆ', entityName: '&circ;' }, // modifier letter circumflex accent
    { glyph: '˜', entityName: '&tilde;' }, // small tilde
    { glyph: '–', entityName: '&ndash;' }, // en dash
    { glyph: '—', entityName: '&mdash;' }, // em dash
    { glyph: '‘', entityName: '&lsquo;' }, // left single quotation mark
    { glyph: '’', entityName: '&rsquo;' }, // right single quotation mark
    { glyph: '‚', entityName: '&sbquo;' }, // single low-9 quotation mark
    { glyph: '“', entityName: '&ldquo;' }, // left double quotation mark
    { glyph: '”', entityName: '&rdquo;' }, // right double quotation mark
    { glyph: '„', entityName: '&bdquo;' }, // double low-9 quotation mark
    { glyph: '†', entityName: '&dagger;' }, // dagger
    { glyph: '‡', entityName: '&Dagger;' }, // double dagger
    { glyph: '•', entityName: '&bull;' }, // bullet
    { glyph: '…', entityName: '&hellip;' }, // horizontal ellipsis
    { glyph: '‰', entityName: '&permil;' }, // per mille
    { glyph: '′', entityName: '&prime;' }, // minutes
    { glyph: '″', entityName: '&Prime;' }, // seconds
    { glyph: '‹', entityName: '&lsaquo;' }, // single left angle quotation
    { glyph: '›', entityName: '&rsaquo;' }, // single right angle quotation
    { glyph: '‾', entityName: '&oline;' }, // overline
    { glyph: '€', entityName: '&euro;' }, // euro
    { glyph: '™', entityName: '&trade;' }, // trademark
    { glyph: '←', entityName: '&larr;' }, // left arrow
    { glyph: '↑', entityName: '&uarr;' }, // up arrow
    { glyph: '→', entityName: '&rarr;' }, // right arrow
    { glyph: '↓', entityName: '&darr;' }, // down arrow
    { glyph: '↔', entityName: '&harr;' }, // left right arrow
    { glyph: '↵', entityName: '&crarr;' }, // carriage return arrow
    { glyph: '⌈', entityName: '&lceil;' }, // left ceiling
    { glyph: '⌉', entityName: '&rceil;' }, // right ceiling
    { glyph: '⌊', entityName: '&lfloor;' }, // left floor
    { glyph: '⌋', entityName: '&rfloor;' }, // right floor
    { glyph: '◊', entityName: '&loz;' }, // lozenge
    { glyph: '♠', entityName: '&spades;' }, // spade
    { glyph: '♣', entityName: '&clubs;' }, // club
    { glyph: '♥', entityName: '&hearts;' }, // heart
    { glyph: '♦', entityName: '&diams;' }, // diamond
    { glyph: '∀', entityName: '&forall;' }, // for all
    { glyph: '∂', entityName: '&part;' }, // part
    { glyph: '∃', entityName: '&exist;' }, // exists
    { glyph: '∅', entityName: '&empty;' }, // empty
    { glyph: '∇', entityName: '&nabla;' }, // nabla
    { glyph: '∈', entityName: '&isin;' }, // isin
    { glyph: '∉', entityName: '&notin;' }, // notin
    { glyph: '∋', entityName: '&ni;' }, // ni
    { glyph: '∏', entityName: '&prod;' }, // prod
    { glyph: '∑', entityName: '&sum;' }, // sum
    { glyph: '−', entityName: '&minus;' }, // minus
    { glyph: '∗', entityName: '&lowast;' }, // lowast
    { glyph: '√', entityName: '&radic;' }, // square root
    { glyph: '∝', entityName: '&prop;' }, // proportional to
    { glyph: '∞', entityName: '&infin;' }, // infinity
    { glyph: '∠', entityName: '&ang;' }, // angle
    { glyph: '∧', entityName: '&and;' }, // and
    { glyph: '∨', entityName: '&or;' }, // or
    { glyph: '∩', entityName: '&cap;' }, // cap
    { glyph: '∪', entityName: '&cup;' }, // cup
    { glyph: '∫', entityName: '&int;' }, // integral
    { glyph: '∴', entityName: '&there4;' }, // therefore
    { glyph: '∼', entityName: '&sim;' }, // similar to
    { glyph: '≅', entityName: '&cong;' }, // congruent to
    { glyph: '≈', entityName: '&asymp;' }, // almost equal
    { glyph: '≠', entityName: '&ne;' }, // not equal
    { glyph: '≡', entityName: '&equiv;' }, // equivalent
    { glyph: '≤', entityName: '&le;' }, // less or equal
    { glyph: '≥', entityName: '&ge;' }, // greater or equal
    { glyph: '⊂', entityName: '&sub;' }, // subset of
    { glyph: '⊃', entityName: '&sup;' }, // superset of
    { glyph: '⊄', entityName: '&nsub;' }, // not subset of
    { glyph: '⊆', entityName: '&sube;' }, // subset or equal
    { glyph: '⊇', entityName: '&supe;' }, // superset or equal
    { glyph: '⊕', entityName: '&oplus;' }, // circled plus
    { glyph: '⊗', entityName: '&otimes;' }, // circled times
    { glyph: '⊥', entityName: '&perp;' }, // perpendicular
    { glyph: '⋅', entityName: '&sdot;' }, // dot operator
    { glyph: 'Α', entityName: '&Alpha;' }, // Alpha
    { glyph: 'Β', entityName: '&Beta;' }, // Beta
    { glyph: 'Γ', entityName: '&Gamma;' }, // Gamma
    { glyph: 'Δ', entityName: '&Delta;' }, // Delta
    { glyph: 'Ε', entityName: '&Epsilon;' }, // Epsilon
    { glyph: 'Ζ', entityName: '&Zeta;' }, // Zeta
    { glyph: 'Η', entityName: '&Eta;' }, // Eta
    { glyph: 'Θ', entityName: '&Theta;' }, // Theta
    { glyph: 'Ι', entityName: '&Iota;' }, // Iota
    { glyph: 'Κ', entityName: '&Kappa;' }, // Kappa
    { glyph: 'Λ', entityName: '&Lambda;' }, // Lambda
    { glyph: 'Μ', entityName: '&Mu;' }, // Mu
    { glyph: 'Ν', entityName: '&Nu;' }, // Nu
    { glyph: 'Ξ', entityName: '&Xi;' }, // Xi
    { glyph: 'Ο', entityName: '&Omicron;' }, // Omicron
    { glyph: 'Π', entityName: '&Pi;' }, // Pi
    { glyph: 'Ρ', entityName: '&Rho;' }, // Rho
    { glyph: 'Σ', entityName: '&Sigma;' }, // Sigma
    { glyph: 'Τ', entityName: '&Tau;' }, // Tau
    { glyph: 'Υ', entityName: '&Upsilon;' }, // Upsilon
    { glyph: 'Φ', entityName: '&Phi;' }, // Phi
    { glyph: 'Χ', entityName: '&Chi;' }, // Chi
    { glyph: 'Ψ', entityName: '&Psi;' }, // Psi
    { glyph: 'Ω', entityName: '&Omega;' }, // Omega
    { glyph: 'α', entityName: '&alpha;' }, // alpha
    { glyph: 'β', entityName: '&beta;' }, // beta
    { glyph: 'γ', entityName: '&gamma;' }, // gamma
    { glyph: 'δ', entityName: '&delta;' }, // delta
    { glyph: 'ε', entityName: '&epsilon;' }, // epsilon
    { glyph: 'ζ', entityName: '&zeta;' }, // zeta
    { glyph: 'η', entityName: '&eta;' }, // eta
    { glyph: 'θ', entityName: '&theta;' }, // theta
    { glyph: 'ι', entityName: '&iota;' }, // iota
    { glyph: 'κ', entityName: '&kappa;' }, // kappa
    { glyph: 'λ', entityName: '&lambda;' }, // lambda
    { glyph: 'μ', entityName: '&mu;' }, // mu
    { glyph: 'ν', entityName: '&nu;' }, // nu
    { glyph: 'ξ', entityName: '&xi;' }, // xi
    { glyph: 'ο', entityName: '&omicron;' }, // omicron
    { glyph: 'π', entityName: '&pi;' }, // pi
    { glyph: 'ρ', entityName: '&rho;' }, // rho
    { glyph: 'ς', entityName: '&sigmaf;' }, // sigmaf
    { glyph: 'σ', entityName: '&sigma;' }, // sigma
    { glyph: 'τ', entityName: '&tau;' }, // tau
    { glyph: 'υ', entityName: '&upsilon;' }, // upsilon
    { glyph: 'φ', entityName: '&phi;' }, // phi
    { glyph: 'χ', entityName: '&chi;' }, // chi
    { glyph: 'ψ', entityName: '&psi;' }, // psi
    { glyph: 'ω', entityName: '&omega;' }, // omega
    { glyph: 'ϑ', entityName: '&thetasym;' }, // theta symbol
    { glyph: 'ϒ', entityName: '&upsih;' }, // upsilon symbol
    { glyph: 'ϖ', entityName: '&piv;' }, // pi symbol
    { glyph: 'À', entityName: '&Agrave;' }, // capital a, grave accent
    { glyph: 'Á', entityName: '&Aacute;' }, // capital a, acute accent
    { glyph: 'Â', entityName: '&Acirc;' }, // capital a, circumflex accent
    { glyph: 'Ã', entityName: '&Atilde;' }, // capital a, tilde
    { glyph: 'Ä', entityName: '&Auml;' }, // capital a, umlaut mark
    { glyph: 'Å', entityName: '&Aring;' }, // capital a, ring
    { glyph: 'Æ', entityName: '&AElig;' }, // capital ae
    { glyph: 'Ç', entityName: '&Ccedil;' }, // capital c, cedilla
    { glyph: 'È', entityName: '&Egrave;' }, // capital e, grave accent
    { glyph: 'É', entityName: '&Eacute;' }, // capital e, acute accent
    { glyph: 'Ê', entityName: '&Ecirc;' }, // capital e, circumflex accent
    { glyph: 'Ë', entityName: '&Euml;' }, // capital e, umlaut mark
    { glyph: 'Ì', entityName: '&Igrave;' }, // capital i, grave accent
    { glyph: 'Í', entityName: '&Iacute;' }, // capital i, acute accent
    { glyph: 'Î', entityName: '&Icirc;' }, // capital i, circumflex accent
    { glyph: 'Ï', entityName: '&Iuml;' }, // capital i, umlaut mark
    { glyph: 'Ð', entityName: '&ETH;' }, // capital eth, Icelandic
    { glyph: 'Ñ', entityName: '&Ntilde;' }, // capital n, tilde
    { glyph: 'Ò', entityName: '&Ograve;' }, // capital o, grave accent
    { glyph: 'Ó', entityName: '&Oacute;' }, // capital o, acute accent
    { glyph: 'Ô', entityName: '&Ocirc;' }, // capital o, circumflex accent
    { glyph: 'Õ', entityName: '&Otilde;' }, // capital o, tilde
    { glyph: 'Ö', entityName: '&Ouml;' }, // capital o, umlaut mark
    { glyph: 'Ø', entityName: '&Oslash;' }, // capital o, slash
    { glyph: 'Ù', entityName: '&Ugrave;' }, // capital u, grave accent
    { glyph: 'Ú', entityName: '&Uacute;' }, // capital u, acute accent
    { glyph: 'Û', entityName: '&Ucirc;' }, // capital u, circumflex accent
    { glyph: 'Ü', entityName: '&Uuml;' }, // capital u, umlaut mark
    { glyph: 'Ý', entityName: '&Yacute;' }, // capital y, acute accent
    { glyph: 'Þ', entityName: '&THORN;' }, // capital THORN, Icelandic
    { glyph: 'ß', entityName: '&szlig;' }, // small sharp s, German
    { glyph: 'à', entityName: '&agrave;' }, // small a, grave accent
    { glyph: 'á', entityName: '&aacute;' }, // small a, acute accent
    { glyph: 'â', entityName: '&acirc;' }, // small a, circumflex accent
    { glyph: 'ã', entityName: '&atilde;' }, // small a, tilde
    { glyph: 'ä', entityName: '&auml;' }, // small a, umlaut mark
    { glyph: 'å', entityName: '&aring;' }, // small a, ring
    { glyph: 'æ', entityName: '&aelig;' }, // small ae
    { glyph: 'ç', entityName: '&ccedil;' }, // small c, cedilla
    { glyph: 'è', entityName: '&egrave;' }, // small e, grave accent
    { glyph: 'é', entityName: '&eacute;' }, // small e, acute accent
    { glyph: 'ê', entityName: '&ecirc;' }, // small e, circumflex accent
    { glyph: 'ë', entityName: '&euml;' }, // small e, umlaut mark
    { glyph: 'ì', entityName: '&igrave;' }, // small i, grave accent
    { glyph: 'í', entityName: '&iacute;' }, // small i, acute accent
    { glyph: 'î', entityName: '&icirc;' }, // small i, circumflex accent
    { glyph: 'ï', entityName: '&iuml;' }, // small i, umlaut mark
    { glyph: 'ð', entityName: '&eth;' }, // small eth, Icelandic
    { glyph: 'ñ', entityName: '&ntilde;' }, // small n, tilde
    { glyph: 'ò', entityName: '&ograve;' }, // small o, grave accent
    { glyph: 'ó', entityName: '&oacute;' }, // small o, acute accent
    { glyph: 'ô', entityName: '&ocirc;' }, // small o, circumflex accent
    { glyph: 'õ', entityName: '&otilde;' }, // small o, tilde
    { glyph: 'ö', entityName: '&ouml;' }, // small o, umlaut mark
    { glyph: 'ø', entityName: '&oslash;' }, // small o, slash
    { glyph: 'ù', entityName: '&ugrave;' }, // small u, grave accent
    { glyph: 'ú', entityName: '&uacute;' }, // small u, acute accent
    { glyph: 'û', entityName: '&ucirc;' }, // small u, circumflex accent
    { glyph: 'ü', entityName: '&uuml;' }, // small u, umlaut mark
    { glyph: 'ý', entityName: '&yacute;' }, // small y, acute accent
    { glyph: 'þ', entityName: '&thorn;' }, // small thorn, Icelandic
    { glyph: 'ÿ', entityName: '&yuml;' }, // small y, umlaut mark
    { glyph: '¡', entityName: '&iexcl;' }, // inverted exclamation mark
    { glyph: '¢', entityName: '&cent;' }, // cent
    { glyph: '£', entityName: '&pound;' }, // pound
    { glyph: '¤', entityName: '&curren;' }, // currency
    { glyph: '¥', entityName: '&yen;' }, // yen
    { glyph: '¦', entityName: '&brvbar;' }, // broken vertical bar
    { glyph: '§', entityName: '&sect;' }, // section
    { glyph: '¨', entityName: '&uml;' }, // spacing diaeresis
    { glyph: '©', entityName: '&copy;' }, // copyright
    { glyph: 'ª', entityName: '&ordf;' }, // feminine ordinal indicator
    { glyph: '«', entityName: '&laquo;' }, // angle quotation mark (left)
    { glyph: '¬', entityName: '&not;' }, // negation
    { glyph: '®', entityName: '&reg;' }, // registered trademark
    { glyph: '¯', entityName: '&macr;' }, // spacing macron
    { glyph: '°', entityName: '&deg;' }, // degree
    { glyph: '±', entityName: '&plusmn;' }, // plus-or-minus
    { glyph: '²', entityName: '&sup2;' }, // superscript 2
    { glyph: '³', entityName: '&sup3;' }, // superscript 3
    { glyph: '´', entityName: '&acute;' }, // spacing acute
    { glyph: 'µ', entityName: '&micro;' }, // micro
    { glyph: '¶', entityName: '&para;' }, // paragraph
    { glyph: '·', entityName: '&middot;' }, // middle dot
    { glyph: '¸', entityName: '&cedil;' }, // spacing cedilla
    { glyph: '¹', entityName: '&sup1;' }, // superscript 1
    { glyph: 'º', entityName: '&ordm;' }, // masculine ordinal indicator
    { glyph: '»', entityName: '&raquo;' }, // angle quotation mark (right)
    { glyph: '¼', entityName: '&frac14;' }, // fraction 1/4
    { glyph: '½', entityName: '&frac12;' }, // fraction 1/2
    { glyph: '¾', entityName: '&frac34;' }, // fraction 3/4
    { glyph: '¿', entityName: '&iquest;' }, // inverted question mark
    { glyph: '×', entityName: '&times;' }, // multiplication
    { glyph: '÷', entityName: '&divide;' }, // division
  ];

  characters.forEach(characterItem => {

    if (string.includes(characterItem.entityName)) {

      string = string.replace(new RegExp(characterItem.entityName, 'g'), characterItem.glyph);

    };

  });

  return string;

};
