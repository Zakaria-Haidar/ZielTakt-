// Town landing pages for zieltakt.de, served at /standorte/<slug>.
// lage: one factual line (distance/direction from Konstanz, DE or CH) shown under the H1.
// Content written 2026-10-31. Every page has its own text - do not copy paragraphs between towns.
// referenzen: only rendered when freigegeben === true (client OK in writing / WhatsApp screenshot saved).

const towns = [
  {
    slug: "konstanz",
    lage: "Unser Standort: das Studio sitzt in Konstanz",
    stadt: "Konstanz",
    land: "DE",
    lang: "de-DE",
    keyword: "Webdesign Konstanz",
    title: "Webdesign & Local SEO für Unternehmen in Konstanz | ZielTakt",
    metaDescription:
      "Webdesign aus Konstanz: schnelle Websites, Google-Profil und lokales SEO für Betriebe in Konstanz und Umgebung. Persönlich vor Ort, fester Ansprechpartner.",
    h1: "Webdesign in Konstanz",
    intro: [
      "ZielTakt sitzt in Konstanz. Wenn Sie hier einen Betrieb führen, treffen wir uns persönlich: bei Ihnen im Laden, in der Werkstatt oder auf einen Kaffee in der Stadt. Kein Callcenter, kein Ticketsystem. Sie sprechen direkt mit Zakaria Haidar, der Ihre Website plant und umsetzt.",
      "Ich baue Websites für lokale Betriebe, die auf dem Handy schnell laden, bei Google gefunden werden und aus Besuchern Anfragen machen, per Anruf, WhatsApp oder Formular.",
    ],
    abschnitte: [
      {
        h2: "Was eine Website in Konstanz können muss",
        absaetze: [
          "Konstanz ist eine Grenzstadt. Ein großer Teil Ihrer möglichen Kundschaft kommt aus Kreuzlingen und dem Thurgau, sucht mit Schweizer Handys und vergleicht Preise in Franken und Euro. Dazu kommen Studierende von Universität und HTWG, Gäste in der Saison und Menschen aus Petershausen, Wollmatingen, Paradies oder Litzelstetten, die einfach etwas in der Nähe suchen.",
          "Eine Website für Konstanz zeigt deshalb Öffnungszeiten, Anfahrt und Kontakt sofort, funktioniert auf deutschen wie Schweizer Geräten sauber und passt in der Google-Suche zu dem Stadtteil, in dem Sie arbeiten.",
        ],
      },
      {
        h2: "Was Sie von mir bekommen",
        liste: [
          "Eine Website mit eigenen Seiten für Ihre Leistungen, damit Google versteht, was Sie anbieten und wo",
          "Ein Google-Unternehmensprofil mit echten Fotos, Leistungen und Öffnungszeiten, die mit der Website übereinstimmen",
          "Online-Terminbuchung und automatische Antworten, damit keine Anfrage verloren geht, während Sie arbeiten",
          "Rechtlich sauberer Aufbau: Impressum, Datenschutz, Schriften vom eigenen Server, Karten erst nach Klick",
        ],
      },
    ],
    faq: [
      {
        frage: "Kommen Sie für ein Gespräch vorbei?",
        antwort:
          "Ja. In Konstanz komme ich zu Ihnen in den Betrieb, das erste Gespräch ist kostenlos. Wenn es Ihnen lieber ist, geht es auch per Telefon oder Video.",
      },
      {
        frage: "Kann meine Website auch Kundschaft aus der Schweiz ansprechen?",
        antwort:
          "Ja. Dazu gehören Preise zusätzlich in Franken, ein Kontaktweg, der von Schweizer Handys ohne Umwege funktioniert, und Texte, die auch die Begriffe enthalten, mit denen Schweizer suchen.",
      },
      {
        frage: "Wie lange dauert eine neue Website?",
        antwort:
          "Eine Website mit wenigen Seiten ist meist innerhalb von ein bis zwei Wochen online, sobald Texte und Fotos da sind. Bei größeren Projekten legen wir vorher einen festen Zeitplan fest.",
      },
    ],
    referenzen: [
      {
        name: "Auto Kosmetik Swissline",
        ort: "Konstanz",
        text: "Überarbeitung der Website des Fahrzeugaufbereiters: klarere Seitenstruktur, Telefonnummer direkt im Menü, korrigierte Google-Strukturdaten.",
        url: "https://www.autokosmetik-swissline.de",
        freigegeben: false,
      },
      {
        name: "Logan's Linde",
        ort: "Konstanz-Wollmatingen",
        text: "Neugestaltung der Speisekarte für das Irish Pub in Wollmatingen: klare Schriften, einheitliche Struktur, korrigierte Texte.",
        url: "https://logans-wollmatingen.de",
        freigegeben: false,
      },
    ],
    umgebung: ["Kreuzlingen", "Allensbach", "Reichenau", "Radolfzell"],
  },

  {
    slug: "singen",
    lage: "Rund 30 km westlich von Konstanz · etwa 30 Minuten über die B33",
    stadt: "Singen",
    land: "DE",
    lang: "de-DE",
    keyword: "Webdesigner Singen",
    title: "Webdesign & Local SEO für Unternehmen in Singen | ZielTakt",
    metaDescription:
      "Websites für Betriebe in Singen und im Hegau: mobil schnell, bei Google sichtbar, auf Wunsch zweisprachig. Persönliche Betreuung aus Konstanz.",
    h1: "Webdesign für Betriebe in Singen",
    intro: [
      "Singen ist die Einkaufsstadt im Hegau. Wer hier ein Geschäft, ein Studio oder einen Handwerksbetrieb führt, steht neben großen Ketten in der Innenstadt und Anbietern aus dem ganzen Umland. Eine gute Website sorgt dafür, dass Menschen aus Singen, Rielasingen-Worblingen, Gottmadingen oder Hilzingen zuerst bei Ihnen landen.",
      "Mit dem Seehas bin ich in gut einer halben Stunde aus Konstanz bei Ihnen und betreue Sie persönlich, vom ersten Gespräch bis lange nach dem Start.",
    ],
    abschnitte: [
      {
        h2: "Mehrsprachig, wenn Ihre Kundschaft es ist",
        absaetze: [
          "In Singen leben Menschen aus sehr vielen Ländern. Viele Betriebe haben Kundinnen und Kunden, die lieber auf Arabisch, Türkisch oder einer anderen Sprache lesen. Eine zweite Sprachversion ist dann kein Extra, sondern oft der Grund, warum jemand anruft statt weiterzuscrollen.",
          "Ich spreche selbst Deutsch, Arabisch und Englisch und baue zweisprachige Websites, auf Arabisch mit echter Darstellung von rechts nach links, nicht nur übersetztem Text.",
        ],
      },
      {
        h2: "Vom Google-Profil zur Anfrage",
        absaetze: [
          "Viele Betriebe in Singen haben schon ein Google-Profil, bekommen darüber aber kaum Anrufe. Das Profil bringt Sie in die Karte, die Website entscheidet, ob jemand Kontakt aufnimmt. Beides muss zusammenpassen: gleiche Adresse, gleiche Öffnungszeiten, gleiche Telefonnummer.",
        ],
        liste: [
          "Termin per WhatsApp mit einem Klick, mit vorausgefüllter Nachricht",
          "Leistungen und Preise so dargestellt, dass man auf dem Handy nicht suchen muss",
          "Google-Profil eingerichtet und mit der Website abgestimmt",
          "Karte und Anfahrt, datenschutzkonform erst nach Klick geladen",
        ],
      },
    ],
    faq: [
      {
        frage: "Machen Sie auch Websites auf Arabisch?",
        antwort:
          "Ja. Ich erstelle Websites auf Deutsch und Arabisch, mit getrennter Sprachversion und Darstellung von rechts nach links. Andere Sprachen sind möglich, wenn Sie die Übersetzung liefern oder prüfen lassen.",
      },
      {
        frage: "Ich habe schon ein Google-Profil. Brauche ich trotzdem eine Website?",
        antwort:
          "Wenn das Profil Anrufe bringt, ist es ein guter Anfang. Die Website ist der Ort, an dem Menschen entscheiden, ob sie Ihnen vertrauen: mit Leistungen, Fotos und einem einfachen Weg zur Anfrage. Ohne Website verschenken Sie einen Teil der Besucher, die das Profil schon zu Ihnen bringt.",
      },
      {
        frage: "Kommen Sie nach Singen?",
        antwort:
          "Ja, nach Singen und in den Hegau, also auch nach Engen, Gottmadingen, Rielasingen-Worblingen oder Hilzingen. Das erste Gespräch ist kostenlos.",
      },
    ],
    referenzen: [
      {
        name: "Abeer Beauty Center",
        ort: "Singen, Hauptstraße",
        text: "Zweisprachige Website auf Deutsch und Arabisch für ein Kosmetikstudio: Terminanfrage per WhatsApp, Karte erst nach Klick, Öffnungszeiten direkt sichtbar.",
        url: "https://abeerbeauty-center.de",
        freigegeben: false,
      },
    ],
    umgebung: ["Engen", "Gottmadingen", "Rielasingen-Worblingen", "Radolfzell"],
  },

  {
    slug: "radolfzell",
    lage: "Rund 20 km westlich von Konstanz · 20 Minuten mit Auto oder Seehas",
    stadt: "Radolfzell",
    land: "DE",
    lang: "de-DE",
    keyword: "Webdesign Radolfzell",
    title: "Webdesign & Local SEO für Unternehmen in Radolfzell | ZielTakt",
    metaDescription:
      "Webdesign für Radolfzell, die Höri und den Untersee: Websites und Google-Profile für Handwerk, Gastronomie und Ferienvermietung. Persönlich aus Konstanz.",
    h1: "Webdesign in Radolfzell und am Untersee",
    intro: [
      "Radolfzell hat zwei Arten von Kundschaft: die Menschen aus Radolfzell, Böhringen, Markelfingen und von der Höri, die das ganze Jahr über einen Handwerker, ein Restaurant oder einen Friseur brauchen, und die Gäste, die im Sommer an die Mettnau und an den Untersee kommen. Beide suchen bei Google, aber nach ganz unterschiedlichen Dingen.",
      "Ich helfe Betrieben in Radolfzell, für die Kundschaft gefunden zu werden, die ihnen wirklich Umsatz bringt. Mit dem Seehas sind es rund zwanzig Minuten aus Konstanz.",
    ],
    abschnitte: [
      {
        h2: "Gäste suchen anders als Einheimische",
        absaetze: [
          "Ein Gast sucht im Sommer auf dem Handy nach einem Restaurant am See, einer Unterkunft oder einem Fahrradverleih, oft spontan und manchmal auf Englisch. Wer in Radolfzell wohnt, sucht einen Elektriker oder eine Kosmetikerin und will vor allem eine Telefonnummer und Öffnungszeiten.",
          "Ihre Website sollte für die Gruppe gebaut sein, von der Sie leben. Für Gastronomie und Ferienwohnungen heißt das: Fotos, Lage und direkte Buchung. Für Handwerk und Dienstleistung: Leistungen, Einsatzgebiet und ein schneller Weg zum Anruf.",
        ],
      },
      {
        h2: "Saison richtig abbilden",
        absaetze: [
          "Am Untersee ändern sich Öffnungszeiten oft zwischen Sommer und Winter. Stehen auf Website und Google-Profil noch die Sommerzeiten, stehen Gäste vor verschlossener Tür und schreiben im schlimmsten Fall eine schlechte Bewertung. Ich richte Website und Profil so ein, dass Saisonzeiten und Betriebsferien mit wenig Aufwand aktuell bleiben.",
        ],
        liste: [
          "Direkte Online-Buchung für Tische, Termine oder Ferienwohnungen",
          "Saisonale Öffnungszeiten und Betriebsferien auf Website und Google-Profil",
          "Fotos von Ihrem Betrieb statt Stockbildern",
          "Auf Wunsch eine englische Kurzversion für Gäste",
        ],
      },
    ],
    faq: [
      {
        frage: "Lohnt sich eine Website, wenn ich fast nur Stammkunden habe?",
        antwort:
          "Stammkunden finden Sie auch ohne Website. Neue Kundschaft, zum Beispiel Zugezogene oder Menschen von der Höri, sucht aber zuerst bei Google. Wenn Sie keine neuen Kunden brauchen, sage ich Ihnen das ehrlich und wir halten es klein.",
      },
      {
        frage: "Können Gäste auf der Website direkt buchen?",
        antwort:
          "Ja. Tische, Termine oder Ferienwohnungen lassen sich direkt über Ihre Website buchen, mit Bestätigung per E-Mail. Für Ferienwohnungen kann das eine Ergänzung zu Buchungsportalen sein, über die Sie bisher vermieten.",
      },
      {
        frage: "Kommen Sie auch auf die Höri?",
        antwort:
          "Ja, nach Radolfzell, Moos, Gaienhofen, Öhningen und Umgebung. Das erste Gespräch ist kostenlos.",
      },
    ],
    referenzen: [],
    umgebung: ["Singen", "Allensbach", "Konstanz", "Stockach"],
  },

  {
    slug: "kreuzlingen",
    lage: "Direkt an der Grenze zu Konstanz · Kanton Thurgau, Schweiz",
    stadt: "Kreuzlingen",
    land: "CH",
    lang: "de-CH",
    keyword: "Webdesign Kreuzlingen",
    title: "Webdesign & Local SEO für Unternehmen in Kreuzlingen | ZielTakt",
    metaDescription:
      "Webseiten für KMU in Kreuzlingen und im Thurgau: Offerte in CHF, Datenschutz nach revDSG, persönliche Betreuung direkt von der Grenze in Konstanz.",
    h1: "Webdesign für Kreuzlingen und den Thurgau",
    intro: [
      "Von Konstanz nach Kreuzlingen sind es ein paar Minuten zu Fuss. Ich betreue Betriebe in Kreuzlingen, Tägerwilen, Bottighofen und im ganzen Thurgau, persönlich vor Ort und mit einer Offerte in Franken.",
      "Ich baue Webseiten, die auf dem Handy schnell laden, bei Google gefunden werden und Anfragen bringen, abgestimmt auf das, was Schweizer Kundinnen und Kunden erwarten.",
    ],
    abschnitte: [
      {
        h2: "Was bei Schweizer Webseiten anders ist",
        absaetze: [
          "Seit September 2023 gilt in der Schweiz das revidierte Datenschutzgesetz (revDSG). Ihre Datenschutzerklärung muss zu dem passen, was Ihre Webseite tatsächlich macht: Kontaktformular, Karte, Buchung, Statistik. Ich sorge dafür, dass die Technik sauber umgesetzt ist und alle eingesetzten Dienste aufgeführt sind.",
          "Auch die Sprache zählt. In der Schweiz sucht man nach einer Webseite und fragt eine Offerte an, schreibt ohne ß und erwartet Preise in CHF. Eine Webseite, die nach deutscher Agentur klingt, wirkt in Kreuzlingen schnell fremd.",
        ],
      },
      {
        h2: "Ihr Vorteil an der Grenze",
        absaetze: [
          "Kreuzlingen und Konstanz sind ein gemeinsamer Markt. Wenn Sie auch Kundschaft aus Deutschland gewinnen wollen, braucht Ihre Webseite klare Preise, einen einfachen Kontakt aus beiden Ländern und Angaben dazu, wie Sie Kundinnen und Kunden von der anderen Seite der Grenze bedienen.",
        ],
        liste: [
          "Offerte und Rechnung in CHF",
          ".ch-Domain, eingerichtet auf Ihren Namen",
          "Google-Unternehmensprofil für Kreuzlingen und Umgebung",
          "Kontakt per Telefon, WhatsApp und Formular, von Schweizer und deutschen Handys gleich einfach",
        ],
      },
    ],
    faq: [
      {
        frage: "Erhalte ich die Offerte in Franken?",
        antwort:
          "Ja. Für Kundinnen und Kunden in der Schweiz erstelle ich Offerte und Rechnung in CHF.",
      },
      {
        frage: "Kommen Sie für Termine nach Kreuzlingen?",
        antwort:
          "Ja. Ich arbeite von Konstanz aus und bin in wenigen Minuten bei Ihnen in Kreuzlingen. Weiter im Thurgau geht es auch per Video oder nach Absprache vor Ort.",
      },
      {
        frage: "Brauche ich eine .ch-Domain?",
        antwort:
          "Für einen Betrieb, der vor allem Schweizer Kundschaft hat, ist .ch die natürliche Wahl und schafft Vertrauen. Die Domain läuft auf Ihren Namen, nicht auf meinen.",
      },
    ],
    referenzen: [],
    umgebung: ["Konstanz", "Tägerwilen", "Bottighofen", "Weinfelden"],
  },

  {
    slug: "friedrichshafen",
    stadt: "Friedrichshafen",
    land: "DE",
    lang: "de-DE",
    lage: "Am Nordufer gegenüber von Konstanz · mit dem Katamaran rund 50 Minuten",
    keyword: "Webdesign Friedrichshafen",
    title: "Webdesign & Local SEO für Unternehmen in Friedrichshafen | ZielTakt",
    metaDescription:
      "Websites und Google-Sichtbarkeit für Betriebe in Friedrichshafen: schnelle Seiten, gepflegtes Google-Profil, Online-Buchung. Persönlich betreut aus Konstanz, direkt über den See.",
    h1: "Websites für Betriebe in Friedrichshafen",
    intro: [
      "Friedrichshafen liegt Konstanz direkt gegenüber am Nordufer des Bodensees. Mit dem Katamaran sind es rund 50 Minuten von Hafen zu Hafen, mit dem Auto über die Fähre Konstanz–Meersburg gut eine Dreiviertelstunde. Für ein Gespräch bei Ihnen vor Ort ist das kein Umweg.",
      "Die Stadt ist geprägt von Industrie, Zulieferern und der Messe. Viele Menschen pendeln hierher zur Arbeit und suchen in der Mittagspause oder nach Feierabend schnell nach einem Friseur, einer Werkstatt oder einem Restaurant in der Nähe. Genau in diesen Momenten muss Ihr Betrieb bei Google oben stehen.",
    ],
    abschnitte: [
      {
        h2: "Gefunden werden zwischen Messe, Werk und Seeufer",
        absaetze: [
          "In Friedrichshafen konkurrieren lokale Betriebe mit Ketten und mit Anbietern aus Ravensburg und Lindau. Wer sein Google-Unternehmensprofil pflegt, echte Fotos zeigt und eine schnelle Website mit klaren Leistungsseiten hat, wird bei Suchen wie „Physiotherapie Friedrichshafen“ oder „Kfz-Werkstatt Fischbach“ deutlich öfter angezeigt.",
          "Während großer Messen ist die Stadt voll mit Gästen von außerhalb. Eine Website, die auf dem Handy sofort Öffnungszeiten, Anfahrt und einen Buchungsknopf zeigt, macht aus diesen Suchenden Kundschaft.",
        ],
      },
    ],
    faq: [
      {
        frage: "Kommen Sie für ein Gespräch nach Friedrichshafen?",
        antwort:
          "Ja. Das erste Gespräch ist kostenlos, gern bei Ihnen im Betrieb. Alternativ sprechen wir per Video oder WhatsApp.",
      },
    ],
    referenzen: [],
    umgebung: ["Meersburg", "Überlingen", "Konstanz"],
  },

  {
    slug: "meersburg",
    stadt: "Meersburg",
    land: "DE",
    lang: "de-DE",
    lage: "Gegenüber von Konstanz am Nordufer · rund 15 Minuten mit der Fähre",
    keyword: "Webdesign Meersburg",
    title: "Webdesign & Local SEO für Unternehmen in Meersburg | ZielTakt",
    metaDescription:
      "Webdesign für Hotels, Weingüter, Gastronomie und Läden in Meersburg: Websites für Gäste aus aller Welt, Google-Profil, Online-Buchung. Aus Konstanz, eine Fährfahrt entfernt.",
    h1: "Webdesign für Meersburg: für Gäste und Einheimische",
    intro: [
      "Meersburg ist von Konstanz aus nur eine Fährfahrt entfernt: Die Autofähre ab Staad braucht rund 15 Minuten und fährt rund um die Uhr. Wir sind also schnell bei Ihnen, ob im Hotel an der Unterstadt, im Weingut am Hang oder im Café an der Promenade.",
      "In einer kleinen Stadt mit so vielen Gästen kommt ein großer Teil der Kundschaft von außerhalb. Diese Menschen kennen Ihren Betrieb nicht, sie suchen auf dem Handy nach „Hotel Meersburg“, „Weinprobe Bodensee“ oder „Restaurant mit Seeblick“ und entscheiden in wenigen Sekunden.",
    ],
    abschnitte: [
      {
        h2: "Was Betriebe in Meersburg online brauchen",
        liste: [
          "Eine Website, die auf dem Handy schnell lädt, auch im schwachen Netz an der Uferpromenade",
          "Mehrsprachige Inhalte für internationale Gäste, auf Wunsch in jeder Sprache",
          "Online-Reservierung oder Buchungsanfrage, damit Sie außerhalb der Öffnungszeiten keine Gäste verlieren",
          "Ein gepflegtes Google-Profil mit aktuellen Saisonzeiten, denn viele Betriebe öffnen nicht ganzjährig",
        ],
      },
    ],
    faq: [
      {
        frage: "Können Sie Saisonzeiten und Ruhetage automatisch abbilden?",
        antwort:
          "Ja. Öffnungszeiten, Saisonpausen und Feiertage pflegen wir so, dass Website und Google-Profil übereinstimmen. Das vermeidet enttäuschte Gäste vor verschlossener Tür.",
      },
    ],
    referenzen: [],
    umgebung: ["Konstanz", "Überlingen", "Friedrichshafen"],
  },

  {
    slug: "ueberlingen",
    stadt: "Überlingen",
    land: "DE",
    lang: "de-DE",
    lage: "Am Überlinger See, nördlich von Konstanz · rund 35 Minuten mit Auto und Fähre",
    keyword: "Webdesign Überlingen",
    title: "Webdesign & Local SEO für Unternehmen in Überlingen | ZielTakt",
    metaDescription:
      "Websites für Praxen, Therapeuten, Gastronomie und Handwerk in Überlingen: klar, vertrauenswürdig, bei Google sichtbar. Persönlich betreut von ZielTakt aus Konstanz.",
    h1: "Webdesign in Überlingen am Bodensee",
    intro: [
      "Überlingen liegt nördlich von Konstanz am Überlinger See, dem nordwestlichen Arm des Bodensees. Mit Auto und Fähre über Meersburg sind es rund 35 Minuten. Auf der Landkarte nah, auf der Straße nur über den See oder um ihn herum erreichbar, und trotzdem ein fester Teil unseres Einzugsgebiets.",
      "Als Kurort mit vielen Praxen, Therapeuten, Gesundheits- und Wellnessangeboten zieht Überlingen Menschen an, die gezielt suchen und vergleichen. Spätestens seit der Landesgartenschau 2021 kommen außerdem viele Tagesgäste. Ihre Website muss Vertrauen schaffen, bevor jemand zum Telefon greift.",
    ],
    abschnitte: [
      {
        h2: "Vertrauen zuerst: Websites für Gesundheit und Dienstleistung",
        absaetze: [
          "Wer eine Praxis oder Therapie sucht, liest genauer als bei einem Café. Klare Leistungsbeschreibungen, ein Foto des Teams, Hinweise zu Kassen und Privatleistungen und eine einfache Terminanfrage entscheiden, ob Sie angerufen werden.",
          "Für Überlingen achten wir zusätzlich auf gut lesbare Schriften und einen ruhigen Aufbau: Viele Ihrer Patientinnen und Kunden sind älter und nutzen trotzdem das Smartphone.",
        ],
      },
    ],
    faq: [
      {
        frage: "Ist eine Online-Terminbuchung für Praxen datenschutzkonform möglich?",
        antwort:
          "Ja. Wir setzen auf Buchungssysteme mit Servern in der EU, minimale Pflichtfelder und eine passende Datenschutzerklärung. Gesundheitsdaten fragen wir im Formular gar nicht erst ab.",
      },
    ],
    referenzen: [],
    umgebung: ["Meersburg", "Stockach", "Radolfzell"],
  },

  {
    slug: "stockach",
    stadt: "Stockach",
    land: "DE",
    lang: "de-DE",
    lage: "Rund 30 km nordwestlich von Konstanz · am Kreuz von A98 und A81",
    keyword: "Webdesign Stockach",
    title: "Webdesign & Local SEO für Unternehmen in Stockach | ZielTakt",
    metaDescription:
      "Webdesign für Handwerk, Gewerbe und Einzelhandel in Stockach: Websites, die Aufträge bringen, Google-Profil und Bewerbungen. Persönlich betreut aus Konstanz.",
    h1: "Websites für Handwerk und Gewerbe in Stockach",
    intro: [
      "Stockach liegt rund 30 Kilometer nordwestlich von Konstanz, am westlichen Ende des Überlinger Sees und direkt an der Autobahn. Mit dem Auto sind wir in gut einer halben Stunde bei Ihnen.",
      "Die Stadt lebt stark von Handwerk, Gewerbe und Betrieben, die ihre Kundschaft im ganzen Hegau und Linzgau haben. Für solche Betriebe ist die Website weniger Schaufenster als Auftragsquelle: Anfragen für Angebote, Rückrufe und Bewerbungen.",
    ],
    abschnitte: [
      {
        h2: "Aufträge und Fachkräfte über die Website",
        absaetze: [
          "Ein Handwerksbetrieb in Stockach wird selten nur in Stockach gesucht, sondern in Orsingen-Nenzingen, Bodman-Ludwigshafen oder Eigeltingen. Wir legen Leistungsseiten so an, dass Google versteht, welches Gebiet Sie bedienen, ohne für jeden Ort eine leere Kopie zu bauen.",
          "Viele Betriebe hier suchen außerdem dringend Personal. Eine eigene Karriereseite mit kurzer Bewerbung per WhatsApp oder Formular senkt die Hürde für Fachkräfte deutlich.",
        ],
      },
    ],
    faq: [
      {
        frage: "Lohnt sich eine Website, wenn wir genug Aufträge über Empfehlungen bekommen?",
        antwort:
          "Ja, gerade dann: Wer Sie empfohlen bekommt, schaut zuerst online nach. Eine gute Website bestätigt die Empfehlung. Außerdem hilft sie bei der Suche nach Mitarbeitern.",
      },
    ],
    referenzen: [],
    umgebung: ["Radolfzell", "Singen", "Überlingen"],
  },

  {
    slug: "frauenfeld",
    stadt: "Frauenfeld",
    land: "CH",
    lang: "de-CH",
    lage: "Rund 30 km südwestlich von Konstanz · Hauptort des Kantons Thurgau, Schweiz",
    keyword: "Webdesign Frauenfeld",
    title: "Webdesign & Local SEO für Unternehmen in Frauenfeld | ZielTakt",
    metaDescription:
      "Webseiten für KMU in Frauenfeld und im Thurgau: Preise in Franken, Schweizer Schreibweise, revDSG-konform, Google-Profil. ZielTakt aus Konstanz, eine halbe Stunde entfernt.",
    h1: "Webdesign für KMU in Frauenfeld",
    intro: [
      "Frauenfeld ist der Hauptort des Kantons Thurgau und liegt rund 30 Kilometer südwestlich von Konstanz. Über den Grenzübergang Kreuzlingen sind wir in etwa einer halben Stunde bei Ihnen, für ein Gespräch im Betrieb oder an einem Ort Ihrer Wahl.",
      "Als Kantonshauptstadt mit Verwaltung, Gewerbe und vielen kleinen Unternehmen ist Frauenfeld ein Markt, in dem man sich kennt. Umso wichtiger ist, dass Ihre Webseite den gleichen professionellen Eindruck macht wie Ihr Betrieb vor Ort.",
    ],
    abschnitte: [
      {
        h2: "Eine Webseite, die sich Schweizerisch anfühlt",
        liste: [
          "Preise und Offerten in Franken, ohne Umrechnungen oder Euro-Hinweise",
          "Schweizer Schreibweise: „ss“ statt „ß“ und die Begriffe, die Ihre Kundschaft im Thurgau tatsächlich verwendet",
          "Datenschutz nach dem revidierten Schweizer Datenschutzgesetz (revDSG), mit passendem Impressum",
          "Ein Google-Unternehmensprofil, das bei Suchen in Frauenfeld, Weinfelden und Umgebung erscheint",
        ],
      },
    ],
    faq: [
      {
        frage: "Stellen Sie Rechnungen in Franken?",
        antwort:
          "Ja. Für Kundinnen und Kunden in der Schweiz gelten die Frankenpreise aus unserer Preisliste, Sie bezahlen in CHF.",
      },
    ],
    referenzen: [],
    umgebung: ["Kreuzlingen", "Winterthur", "Schaffhausen"],
  },

  {
    slug: "schaffhausen",
    stadt: "Schaffhausen",
    land: "CH",
    lang: "de-CH",
    lage: "Rund 45 km westlich von Konstanz · am Hochrhein, Kanton Schaffhausen",
    keyword: "Webdesign Schaffhausen",
    title: "Webdesign & Local SEO für Unternehmen in Schaffhausen | ZielTakt",
    metaDescription:
      "Webseiten für Betriebe in Schaffhausen: für Kundschaft aus der Schweiz und dem deutschen Umland, Preise in CHF, Google-Profil, Online-Buchung. Von ZielTakt am Bodensee.",
    h1: "Webseiten für Schaffhauser Betriebe am Hochrhein",
    intro: [
      "Schaffhausen liegt rund 45 Kilometer westlich von Konstanz am Hochrhein. Der Kanton grenzt auf drei Seiten an Deutschland, und genau das prägt die Kundschaft: Ein Teil kommt aus der Stadt, ein Teil aus dem Klettgau und ein spürbarer Teil aus Singen, Jestetten und dem übrigen deutschen Umland.",
      "Dazu kommen Gäste, die wegen Munot, Altstadt und Rheinfall in die Region kommen. Eine Webseite für Schaffhausen muss deshalb mehrere Gruppen gleichzeitig ansprechen, ohne unübersichtlich zu werden.",
    ],
    abschnitte: [
      {
        h2: "Kundschaft von beiden Seiten der Grenze",
        absaetze: [
          "Für deutsche Kundinnen und Kunden zählen klare Angaben zu Preisen, Mehrwertsteuer-Rückerstattung und Anfahrt. Für Schweizer Kundschaft zählen Frankenpreise, Schweizer Schreibweise und ein vertrauter Auftritt. Wir bauen die Webseite so, dass beide Gruppen schnell finden, was sie brauchen.",
          "Bei Google sorgen wir dafür, dass Sie bei Suchen aus Schaffhausen, Neuhausen am Rheinfall und Thayngen erscheinen und Ihr Profil auch von Deutschland aus gefunden wird.",
        ],
      },
    ],
    faq: [
      {
        frage: "Treffen wir uns persönlich in Schaffhausen?",
        antwort:
          "Gern. Das erste Gespräch ist kostenlos, auf Wunsch bei Ihnen vor Ort. Viele Abstimmungen danach laufen einfach per WhatsApp oder Video.",
      },
    ],
    referenzen: [],
    umgebung: ["Singen", "Frauenfeld", "Winterthur"],
  },

  {
    slug: "st-gallen",
    stadt: "St. Gallen",
    land: "CH",
    lang: "de-CH",
    lage: "Rund 40 km südöstlich von Konstanz · Zentrum der Ostschweiz",
    keyword: "Webdesign St. Gallen",
    title: "Webdesign & Local SEO für Unternehmen in St. Gallen | ZielTakt",
    metaDescription:
      "Webdesign für KMU in St. Gallen und der Ostschweiz: schnelle Webseiten, Google-Profil, Online-Buchung, revDSG-konform, Preise in CHF. Persönlich betreut von ZielTakt.",
    h1: "Webdesign für Unternehmen in St. Gallen",
    intro: [
      "St. Gallen liegt rund 40 Kilometer südöstlich von Konstanz, über Kreuzlingen und den Thurgau in etwa 45 Minuten erreichbar. Als Zentrum der Ostschweiz mit Universität, Stiftsbezirk und vielen KMU ist die Stadt ein Markt mit viel Auswahl, und mit Kundschaft, die genau vergleicht.",
      "Gerade in einer Stadt mit vielen Studierenden und jungen Berufstätigen wird fast alles zuerst auf dem Handy gesucht. Wer dort langsam lädt oder keine Online-Buchung anbietet, verliert die Anfrage an den Nächsten in der Trefferliste.",
    ],
    abschnitte: [
      {
        h2: "Sichtbar in einer Stadt mit viel Konkurrenz",
        absaetze: [
          "In St. Gallen reicht es nicht, irgendwie online zu sein. Wir arbeiten mit eigenen Seiten für jede Leistung, einem sorgfältig gepflegten Google-Profil und einem System, das Kundinnen und Kunden nach dem Besuch um eine Bewertung bittet. So wachsen Sichtbarkeit und Vertrauen Monat für Monat.",
          "Abgerechnet wird in Franken, Datenschutz und Impressum richten sich nach Schweizer Recht.",
        ],
      },
    ],
    faq: [
      {
        frage: "Arbeiten Sie auch mit Unternehmen in Gossau, Rorschach oder Arbon?",
        antwort:
          "Ja. Die ganze Region zwischen Bodensee und St. Gallen gehört zu unserem Einzugsgebiet. Die Zusammenarbeit läuft persönlich, per Video oder per WhatsApp.",
      },
    ],
    referenzen: [],
    umgebung: ["Kreuzlingen", "Frauenfeld", "Konstanz"],
  },

  {
    slug: "winterthur",
    stadt: "Winterthur",
    land: "CH",
    lang: "de-CH",
    lage: "Rund 55 km südwestlich von Konstanz · Kanton Zürich",
    keyword: "Webdesign Winterthur",
    title: "Webdesign & Local SEO für Unternehmen in Winterthur | ZielTakt",
    metaDescription:
      "Webseiten für KMU, Studios und Handwerk in Winterthur: fester Monatspreis in CHF statt Agenturstunden, Google-Profil, Online-Buchung. ZielTakt vom Bodensee.",
    h1: "Webseiten für Winterthurer KMU",
    intro: [
      "Winterthur liegt rund 55 Kilometer südwestlich von Konstanz, mit dem Auto über die A7 in etwa 45 Minuten. Als sechstgrösste Stadt der Schweiz mit langer Industriegeschichte hat Winterthur eine starke Basis an Gewerbe, Handwerk und Dienstleistern.",
      "Viele dieser Betriebe stehen vor der gleichen Frage: Zürcher Agenturpreise passen nicht zum Budget, ein Baukasten passt nicht zum Anspruch. ZielTakt liegt dazwischen, mit einer professionellen Webseite und einem festen Monatsbetrag in Franken, in dem Betreuung und Änderungen enthalten sind.",
    ],
    abschnitte: [
      {
        h2: "Fester Preis statt Stundenabrechnung",
        absaetze: [
          "Statt jede Änderung einzeln zu offerieren, bekommen Sie Einrichtung plus festen Monatsbetrag. Kleine Anpassungen, Updates, Hosting und die Pflege Ihres Google-Profils sind inklusive. Sie wissen jeden Monat, was die Webseite kostet.",
          "Gesprochen wird persönlich, per Video oder per WhatsApp, auf Deutsch, Englisch, Arabisch oder auf Wunsch in einer anderen Sprache.",
        ],
      },
    ],
    faq: [
      {
        frage: "Ist der Weg aus Konstanz nicht zu weit für eine gute Betreuung?",
        antwort:
          "Nein. Die meisten Abstimmungen laufen ohnehin digital, und für das Kennenlernen oder Fotos vor Ort kommen wir nach Winterthur.",
      },
    ],
    referenzen: [],
    umgebung: ["Zürich", "Frauenfeld", "Schaffhausen"],
  },

  {
    slug: "zuerich",
    stadt: "Zürich",
    land: "CH",
    lang: "de-CH",
    lage: "Rund 75 km südwestlich von Konstanz · direkt mit dem Zug in gut einer Stunde",
    keyword: "Webdesign Zürich",
    title: "Webdesign & Local SEO für Unternehmen in Zürich | ZielTakt",
    metaDescription:
      "Webdesign für kleine Unternehmen in Zürich: professionelle Webseite, Google-Profil und Online-Buchung zum festen Monatspreis in CHF. Mehrsprachig, persönlich betreut.",
    h1: "Webdesign für kleine Unternehmen in Zürich",
    intro: [
      "Zürich liegt rund 75 Kilometer südwestlich von Konstanz, mit dem direkten Zug in gut einer Stunde erreichbar. Wir sind keine Zürcher Agentur, und genau das ist für viele kleine Betriebe hier der Vorteil: keine Zürcher Stundensätze, aber eine Webseite auf dem gleichen Niveau.",
      "In der grössten Stadt der Schweiz ist die Konkurrenz in fast jeder Branche hoch und die Kundschaft international. Coiffeure, Kosmetikstudios, Restaurants und Dienstleister, die mehrsprachig auftreten und auf Google oben stehen, gewinnen hier die Anfragen.",
    ],
    abschnitte: [
      {
        h2: "Mehrsprachig für eine internationale Stadt",
        liste: [
          "Webseite auf Deutsch, Englisch, Arabisch oder auf Wunsch in jeder anderen Sprache",
          "Eigene Seiten für Ihr Quartier, etwa Kreis 4, Oerlikon oder Altstetten, damit Sie bei Suchen in der Nähe erscheinen",
          "Online-Buchung und automatische Antworten, damit keine Anfrage liegen bleibt",
          "Fester Monatsbetrag in Franken, Datenschutz nach revDSG",
        ],
      },
    ],
    faq: [
      {
        frage: "Kann ich in Zürich mit Ihnen auf Arabisch oder Englisch arbeiten?",
        antwort:
          "Ja. Beratung und Betreuung gibt es auf Deutsch, Arabisch und Englisch. Die Webseite selbst kann in jeder gewünschten Sprache umgesetzt werden.",
      },
    ],
    referenzen: [],
    umgebung: ["Winterthur", "Frauenfeld", "St. Gallen"],
  },
];

// Display order (west/east along the lake on the German side, then Switzerland).
const ORDER = [
  'konstanz', 'friedrichshafen', 'meersburg', 'ueberlingen', 'radolfzell', 'singen', 'stockach',
  'kreuzlingen', 'frauenfeld', 'schaffhausen', 'st-gallen', 'winterthur', 'zuerich',
];
export const staedte = ORDER.map((slug) => towns.find((t) => t.slug === slug));

// URL of a town page.
export const townPath = (stadt) => `/standorte/${stadt.slug}`;
