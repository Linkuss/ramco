
/* gettext library */

var catalog = new Array();

function pluralidx(n) {
    var v=(n > 1);
    if (typeof(v) == 'boolean') {
        return v ? 1 : 0;
    } else {
        return v;
    }
}
catalog['%(sel)s of %(cnt)s selected'] = ['',''];
catalog['%(sel)s of %(cnt)s selected'][0] = '%(sel)s sur %(cnt)s s\u00e9lectionn\u00e9';
catalog['%(sel)s of %(cnt)s selected'][1] = '%(sel)s sur %(cnt)s s\u00e9lectionn\u00e9s';
catalog['6 a.m.'] = '6:00';
catalog['Available %s'] = '%s disponible(s)';
catalog['Calendar'] = 'Calendrier';
catalog['Cancel'] = 'Annuler';
catalog['Choose a time'] = 'Choisir une heure';
catalog['Choose all'] = 'Tout choisir';
catalog['Choose'] = 'Choisir';
catalog['Chosen %s'] = 'Choix des \u00ab\u00a0%s \u00bb';
catalog['Click to choose all %s at once.'] = 'Cliquez pour choisir tous les \u00ab\u00a0%s\u00a0\u00bb en une seule op\u00e9ration.';
catalog['Click to remove all chosen %s at once.'] = 'Cliquez pour enlever tous les \u00ab\u00a0%s\u00a0\u00bb en une seule op\u00e9ration.';
catalog['Clock'] = 'Horloge';
catalog['Filter'] = 'Filtrer';
catalog['Hide'] = 'Masquer';
catalog['January February March April May June July August September October November December'] = 'Janvier F\u00e9vrier Mars Avril Mai Juin Juillet Ao\u00fbt Septembre Octobre Novembre D\u00e9cembre';
catalog['Midnight'] = 'Minuit';
catalog['Noon'] = 'Midi';
catalog['Now'] = 'Maintenant';
catalog['Remove all'] = 'Tout enlever';
catalog['Remove'] = 'Enlever';
catalog['S M T W T F S'] = 'D L M M J V S';
catalog['Show'] = 'Afficher';
catalog['This is the list of available %s. You may choose some by selecting them in the box below and then clicking the "Choose" arrow between the two boxes.'] = 'Ceci est une liste des \u00ab\u00a0%s\u00a0\u00bb disponibles. Vous pouvez en choisir en les s\u00e9lectionnant dans la zone ci-dessous, puis en cliquant sur la fl\u00e8che \u00ab\u00a0Choisir\u00a0\u00bb entre les deux zones.';
catalog['This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the "Remove" arrow between the two boxes.'] = 'Ceci est la liste des \u00ab\u00a0%s\u00a0\u00bb choisi(e)s. Vous pouvez en enlever en les s\u00e9lectionnant dans la zone ci-dessous, puis en cliquant sur la fl\u00e8che \u00ab Enlever \u00bb entre les deux zones.';
catalog['Today'] = 'Aujourd\'hui';
catalog['Tomorrow'] = 'Demain';
catalog['Type into this box to filter down the list of available %s.'] = '\u00c9crivez dans cette zone pour filtrer la liste des \u00ab\u00a0%s\u00a0\u00bb disponibles.';
catalog['Yesterday'] = 'Hier';
catalog['You have selected an action, and you haven\'t made any changes on individual fields. You\'re probably looking for the Go button rather than the Save button.'] = 'Vous avez s\u00e9lectionn\u00e9 une action, et vous n\'avez fait aucune modification sur des champs. Vous cherchez probablement le bouton Envoyer et non le bouton Sauvegarder.';
catalog['You have selected an action, but you haven\'t saved your changes to individual fields yet. Please click OK to save. You\'ll need to re-run the action.'] = 'Vous avez s\u00e9lectionn\u00e9 une action, mais vous n\'avez pas encore sauvegard\u00e9 certains champs modifi\u00e9s. Cliquez sur OK pour sauver. Vous devrez r\u00e9appliquer l\'action.';
catalog['You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.'] = 'Vous avez des modifications non sauvegard\u00e9es sur certains champs \u00e9ditables. Si vous lancez une action, ces modifications vont \u00eatre perdues.';


function gettext(msgid) {
    var value = catalog[msgid];
    if (typeof(value) == 'undefined') {
        return msgid;
    } else {
        return (typeof(value) == 'string') ? value : value[0];
    }
}

function ngettext(singular, plural, count) {
    value = catalog[singular];
    if (typeof(value) == 'undefined') {
        return (count == 1) ? singular : plural;
    } else {
        return value[pluralidx(count)];
    }
}

function gettext_noop(msgid) { return msgid; }

function pgettext(context, msgid) {
    var value = gettext(context + '\x04' + msgid);
    if (value.indexOf('\x04') != -1) {
        value = msgid;
    }
    return value;
}

function npgettext(context, singular, plural, count) {
    var value = ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
    if (value.indexOf('\x04') != -1) {
        value = ngettext(singular, plural, count);
    }
    return value;
}

function interpolate(fmt, obj, named) {
    if (named) {
        return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
    } else {
        return fmt.replace(/%s/g, function(match){return String(obj.shift())});
    }
}

/* formatting library */

var formats = new Array();

formats['DATETIME_FORMAT'] = 'j F Y H:i:s';
formats['DATE_FORMAT'] = 'j F Y';
formats['DECIMAL_SEPARATOR'] = ',';
formats['MONTH_DAY_FORMAT'] = 'j F';
formats['NUMBER_GROUPING'] = '3';
formats['TIME_FORMAT'] = 'H:i:s';
formats['FIRST_DAY_OF_WEEK'] = '1';
formats['TIME_INPUT_FORMATS'] = ['%H:%M:%S', '%H:%M'];
formats['THOUSAND_SEPARATOR'] = '\u00a0';
formats['DATE_INPUT_FORMATS'] = ['%d/%m/%Y', '%d/%m/%y', '%d.%m.%Y', '%d.%m.%y', '%Y-%m-%d'];
formats['YEAR_MONTH_FORMAT'] = 'F Y';
formats['SHORT_DATE_FORMAT'] = 'j N Y';
formats['SHORT_DATETIME_FORMAT'] = 'j N Y H:i:s';
formats['DATETIME_INPUT_FORMATS'] = ['%d/%m/%Y %H:%M:%S', '%d/%m/%Y %H:%M', '%d/%m/%Y', '%d.%m.%Y %H:%M:%S', '%d.%m.%Y %H:%M', '%d.%m.%Y', '%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M:%S.%f', '%Y-%m-%d %H:%M', '%Y-%m-%d'];

function get_format(format_type) {
    var value = formats[format_type];
    if (typeof(value) == 'undefined') {
        return format_type;
    } else {
        return value;
    }
}