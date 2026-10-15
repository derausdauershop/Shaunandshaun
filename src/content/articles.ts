/**
 * Magazine articles and news, taken over from the previous website (ausdauer-shop.de/blog and /news).
 * Generated once from the old pages – edit freely from here on.
 */

export type ArticleBlock = { type: "p" | "h"; text: string };

export interface Article {
  slug: string;
  category: "Ratgeber" | "Training" | "News";
  title: string;
  teaser: string;
  author: string | null;
  blocks: ArticleBlock[];
}

export const ARTICLES: Article[] = [
  {
    slug: "zeit-fuer-deinen-neuen-schuh",
    category: "Ratgeber",
    title: "Zeit für deinen neuen Schuh",
    teaser: "Woran du erkennst, dass dein alter Schuh ausgedient hat.",
    author: "Lea Jung",
    blocks: [
      {
        type: "p",
        text: "Alle Läuferinnen und Läufer lieben ihren Laufschuh- mit viel Mühe und Liebe ausprobiert, beraten und getestet wächst der Laufschuh einem schnell ans Herz. Und mit jedem Kilometer mehr, bei dem der Schuh als zuverlässige Begleitung dient, wird der Schuh immer liebgewonnener.",
      },
      {
        type: "p",
        text: "Aber nicht nur liebgewonnener, sondern auch abgenutzter. Und somit kommt irgendwann die Zeit, zu der der Laufschuh am Ende ist und es Zeit für einen neuen wird, auch wenn man den Schuh am liebsten nicht mehr hergeben möchte.",
      },
      {
        type: "p",
        text: "Aber woran erkennt man, dass es Zeit für einen neuen Schuh wird? Es gibt verschiedene Anzeichen dafür, dass du dich auf die Suche nach einem neuen Laufbegleiter machen solltest.",
      },
      {
        type: "p",
        text: "Generell gilt die Devise: Dein Laufschuh hält etwa 800-1000km. Zeitlich lässt sich keine genaue Angabe machen- manche Läuferinnen und Läufer machen diese Kilometer innerhalb eines Jahres, andere innerhalb von mehreren- schließlich hat jeder sein eigenes Tempo.",
      },
      {
        type: "p",
        text: "Auch weitere Faktoren, die die Lebensdauer deines Laufschuhs beeinflussen, sind sehr individuell. Dazu zählen die Laufuntergründe auf denen du unterwegs bist, dein Laufstil, dein Gewicht sowie deine Statur und auch die Art deines aktuellen Schuhs.",
      },
      {
        type: "p",
        text: "Laufuntergründe wie Asphalt oder Schotter beanspruchen die Außensohle eines Schuhs enorm und begünstigen so eine schnellere Abnutzung. Der individuelle Laufstil beansprucht die Schuhe ebenfalls, Pronationen führen oftmals zu Abreibungen an den inneren Seiten der Außensohle und Fersenläuferinnen und -läufer laufen die Sohle im Bereich der Ferse schneller und stärker ab, als Vorfußläuferinnen und -läufer.",
      },
      {
        type: "p",
        text: "Die Art deines aktuellen Schuhs ist ebenfalls ein Faktor, der seine Lebensdauer bestimmt. Sehr leichte und schnelle Wettkampfschuhe machen zum Beispiel weniger Kilometer als gut gedämpfte Schuhe für lange, entspannte Läufe.",
      },
      {
        type: "p",
        text: "Es gibt aber auch direkte Anzeichen am Schuh selbst, die zeigen, dass dein aktueller Schuh in Rente geschickt werden sollte.",
      },
      {
        type: "p",
        text: "Ein ganz offensichtliches Anzeichen sind etwa Risse oder Löcher im Obermaterial oder Innenfutter des Schuhs, wodurch schmerzhafte Reibungspunkte entstehen können.",
      },
      {
        type: "p",
        text: "Auch ein abgelaufenes Profil kann man schnell erkennen, entweder durch einen Blick auf die Unterseite des Schuhs oder durch das Gefühl mangelnden Halts bei nassem Untergrund. Gut zu erkennen ist oft auch die Abreibung und Abnutzung der Außensohle, die dazu führen kann, dass du in deinem Schuh nicht mehr gerade stehst.",
      },
      {
        type: "p",
        text: "Die Dämpfung eines Schuhs nutzt sich natürlich auch bei jedem Lauf ab, wobei das mit bloßem Auge nicht wirklich erkennbar ist. Solltest du aber bemerken, dass dein Schuh nicht mehr so bequem und angenehm ist wie am Anfang und vielleicht sogar Muskelkater oder gar Schmerzen während oder nach dem Laufen empfinden, ist ein neuer Laufschuh sinnvoll.",
      },
      {
        type: "p",
        text: "Behältst du deinen Schuh gut im Auge und achtest auf solche Anzeichen, dann fällt dir zur passenden Zeit auf, dass es Zeit für ein neues Paar Laufschuhe wird, das du garantiert so sehr lieben wirst, wie dein jetziges. Mit der richtigen Beratung steht deinem neuen Lieblingsschuh gar nichts im Weg!",
      },
    ],
  },
  {
    slug: "laufschuhe-richtig-reinigen",
    category: "Ratgeber",
    title: "Das Tabu: Laufschuhe und Waschmaschine",
    teaser: "So reinigst du Laufschuhe richtig.",
    author: "Lea Jung",
    blocks: [
      {
        type: "p",
        text: "Laufschuhe werden stark beansprucht und durch regelmäßiges Laufen, ob im Wald oder auf der Straße, schnell verschmutzt. Um die Schuhe wieder sauber zu bekommen und die bunten Farben genießen zu können sowie die Lebensdauer des Schuhs zu verlängern, gibt es einige Tricks.",
      },
      {
        type: "p",
        text: "Die wichtigste Regel der Laufschuhreinigung ist auf alle Fälle, diese nicht in die Waschmaschine zu werfen.",
      },
      {
        type: "p",
        text: "Ein Waschgang einer Waschmaschine mit vielen harten Umdrehungen greift das Obermaterial des Schuhs, meistens beispielsweise Mesh, nachhaltig an und auch der Schaum der Sohlen kann geschädigt werden. Ob Risse und Verhärtungen im Dämpfungsschaum oder das Lösen von Klebestellen zwischen Sohle und Obermaterial, jede Waschung eines Laufschuhs in der Waschmaschine verkürzt dessen Lebensdauer und erhöht die Gefahr von Beschädigungen, die verhindert werden könnten.",
      },
      {
        type: "p",
        text: "Diese Regel gilt übrigens auch für die Nutzung eines Trockners, der den Schuh nicht nur aufgrund der Umdrehungen und damit einhergehenden Schläge strapaziert, sondern auch wegen der heißen Luft, die besonders die Schäume der Sohle angreift.",
      },
      {
        type: "p",
        text: "Die richtige Reinigung von Laufschuhen ist trotz dessen äußerst simpel und es werden nur wenige Utensilien benötigt.",
      },
      {
        type: "p",
        text: "Die Laufschuhe sollten erst einmal trocknen, auch wenn sie durch einen Waldlauf schlammig sind. Die Reinigung ist einfacher, wenn der Dreck getrocknet ist. Dieser kann dann mit einer Bürste abgebürstet werden, wodurch die gröbste Verschmutzung schnell beseitigt werden kann.",
      },
      {
        type: "p",
        text: "Für eine intensivere Reinigung kann der Schuh auch mit Wasser gereinigt werden. Hier sollten die Einlegesohlen aus dem Schuh genommen und auch die Schnürsenkel vom Schuh entfernt werden. Der Laufschuh kann dann mit einem nassen Lappen oder Schwamm und milder Seife geputzt werden, der Schuh sollte aber nicht komplett in Wasser getaucht werden. Bei äußerst hartnäckiger Verschmutzung kann auch die Bürste verwendet werden, indem mit Wasser und Seife der Dreck vorsichtig abgeschrubbt wird.",
      },
      {
        type: "p",
        text: "Ist die Reinigung der Schuhe vollendet, kann man diese mit Zeitungspapier füllen, sodass dieses Feuchtigkeit aufnimmt und so die Trocknung beschleunigt. Abhängig von der Jahreszeit und des Wetters kann man die Schuhe entweder in der Sonne oder in der Nähe eines Heizkörpers trocknen lassen.",
      },
      {
        type: "p",
        text: "Die entfernten Schnürsenkel können unter fließendem Wasser oder in einem Eimer mit Seife gereinigt werden, die Einlegesohlen werden mit einem Lappen oder Schwamm vorsichtig gereinigt und sollten ebenfalls keinesfalls komplett in Wasser getaucht werden. Nach vollständiger Trocknung können die Sohlen und Schnürsenkel dem Schuh wieder hinzugefügt werden.",
      },
      {
        type: "p",
        text: "Die optimale Reinigung von Laufschuhen ist somit äußerst simpel und schnell ausgeführt, ohne dass der Schuh und dessen empfindliche Materialien angegriffen werden. So wird die Lebensdauer der Schuhe optimiert und der meist auffällige, schicke Look der Schuhe beibehalten.",
      },
    ],
  },
  {
    slug: "laufuntergruende-im-ueberblick",
    category: "Ratgeber",
    title: "Grüner Wald, graue Straße oder roter Tartan",
    teaser: "Die Vielfalt der Laufuntergründe im Überblick.",
    author: "Lea Jung",
    blocks: [
      {
        type: "p",
        text: "Viele Läuferinnen und Läufer schnüren ihre Schuhe, öffnen die Tür und starten ihren Lauf auf eben jenem Untergrund, der vor der Haustür wartet. Oftmals ist das hier in der Region der graue Asphalt der Straße oder des Radwegs sowie Waldwege, gespickt mit Tannennadeln und einigen Wurzeln. Neben diesen beiden klassischen Laufuntergründen findet sich dazu noch der Underdog für viele Langstreckenläufer- die 400 Meter lange Tartanbahn in einigen Stadien.",
      },
      {
        type: "p",
        text: "Bei näherer Betrachtung dieser drei möglichen Laufuntergründe werden schnell signifikante Unterschiede sowie Vor- und Nachteile deutlich.",
      },
      {
        type: "h",
        text: "Der Asphalt",
      },
      {
        type: "p",
        text: "Ob Radweg oder Straße, der graue Untergrund aus Asphalt ist überall zu finden. Läuferinnen und Läufer haben einen sicheren Untergrund ohne potenzielle Gefahrenquellen wie etwa Wurzeln oder plötzliche Absenkungen des Bodens. Das ermöglicht sicheres und schnelles Laufen, auch bei schlechteren Wetterbedingungen wie Regen und oftmals auch zu frühen oder späten Uhrzeiten, wenn die meisten Straßen beleuchtet sind.",
      },
      {
        type: "p",
        text: "Für Läuferinnen und Läufer mit etwa Gelenkproblemen wird der Asphalt bei längeren Läufen und auf Dauer jedoch oft zum Problem- der Straßenbelag ist einer der härtesten Untergründe und das bekommen die Läuferinnen und Läufer letztlich auch zu spüren, in den Gelenken oder auch den Muskeln.",
      },
      {
        type: "p",
        text: "Um die Gelenke zu schonen und Läufe auf Asphalt angenehmer zu gestalten ist die richtige Laufschuhwahl von großer Bedeutung: Gut gedämpfte Schuhe, die für längere Strecken ausgelegt sind, machen den Lauf auf Asphalt zu einem angenehmeren Erlebnis.",
      },
      {
        type: "p",
        text: "Dennoch ist ein Tapeten-, oder hier eben Untergrund, -wechsel hin und wieder von Vorteil. Einerseits entlastet ein anderer Untergrund den Körper, andererseits werden auf anderen Untergründen andere Muskeln, aber auch Gehirnregionen geschult.",
      },
      {
        type: "h",
        text: "Der Waldweg",
      },
      {
        type: "p",
        text: "In der näheren Umgebung finden sich oftmals schöne, befestigte Waldwege, die sich für viele Läufe eignen. Der natürliche Boden im Wald bietet eine angenehme Dämpfung, frische Luft und das Naturerlebnis runden einen Lauf im Wald ab. Die Waldwege bieten abwechslungsreiche Strecken ohne viele Begegnungen und haben oft eine erholende Wirkung.",
      },
      {
        type: "p",
        text: "Nachteile beim Laufen auf Waldwegen sind unter anderem das höhere Unfall- und Verletzungsrisiko aufgrund des sich stets ändernden Untergrunds, etwa mit Wurzeln und Steinen oder auch die im Vergleich zur Straße eingeschränktere Nutzungsmöglichkeit.",
      },
      {
        type: "p",
        text: "So weicht der Waldboden bei schlechtem Wetter auf, es wird rutschiger und auch schmutziger. Laternen findet man im Wald eher selten und möglicherweise vergisst man während eines Running-Highs auch mal welcher Weg zurück jetzt der richtige wäre- der linke oder doch der rechte?",
      },
      {
        type: "p",
        text: "Die richtige Laufschuh-Wahl für Waldläufe ist wichtig, der Schuh sollte eine gute Sohle mit Grip haben und Läuferinnen und Läufern Halt bieten. Abhängig von den Wegen, die gelaufen werden sollen, ist ein Trailrunning-Schuh möglicherweise eine Option. Für frühe, späte oder winterliche Uhrzeiten kann das Laufoutfit mit einer Stirnlampe ergänzt werden und die sichere Orientierung mit einer Laufuhr mit GPS-Funktion gesichert werden.",
      },
      {
        type: "h",
        text: "Der Tartan",
      },
      {
        type: "p",
        text: "Die Heimat der Leichtathletik ist die Tartanbahn, die äußerst vielseitig genutzt wird. Hier werden 100 Meter gesprintet, Latten mit oder ohne Stab überwunden und Mehrkämpfe in sieben oder zehn Disziplinen ausgetragen. Aber auch längere Strecken sind auf der meistens roten Bahn zuhause- die längste Strecke, die man auch bei olympischen Spielen im Stadion auf der Bahn finden kann sind die 10.000m. Die Läuferinnen und Läufer müssen 25 Stadionrunden a 400m absolvieren, um 10km zu erreichen.",
      },
      {
        type: "p",
        text: "Der Untergrund aus Kunststoff bietet eine angenehme Dämpfung (man beachte, dass es bei Tartanbahnen auch „harte“ und „weiche“ Bahnen gibt, wobei für Wettkämpfe die harten und somit schnelleren bevorzugt werden) und, sollte die Laufuhr einmal doch keinen Akku mehr haben, eine gute Möglichkeit die gelaufene Strecke zu tracken. Hier sind Tempoläufe und Intervalle gut zu laufen, der Untergrund ist für Geschwindigkeit ausgelegt und kürzere Distanzen sind einfach zu erkennen. Viele Stadien haben außerdem eine Flutlichtanlage, sodass das Laufen fast immer möglich ist.",
      },
      {
        type: "p",
        text: "Für Langstreckenläuferinnen und -läufer kann die für sie kurze Runde (Leichtathletinnen und Leichtathleten würden das anders sehen) schnell langweilig und monoton werden, mehrmals in der Woche lange Distanzen oder gar Marathontraining auf der Bahn sind daher eher keine Option . Auch wenn die Kunststoffbahn für jedes Wetter geeignet ist, sollte beachtet werden, dass der Tartan nass rutschig werden kann.",
      },
      {
        type: "p",
        text: "Für die schnelleren Einheiten auf der Bahn sind weniger gedämpfte Schuhe ein Vorteil, bei Regen sollten Läuferinnen und Läufer jedoch darauf achten, dass das Profil des Schuhs mit der nassen Bahn kompatibel ist.",
      },
      {
        type: "h",
        text: "Fazit",
      },
      {
        type: "p",
        text: "Laufen ist prinzipiell auf fast jedem Untergrund möglich, abhängig von den Zielen der Läuferinnen und Läufer. Regelmäßige Abwechslung der Untergründe ist für den Körper und auch den Kopf von Vorteil und hilft auch dabei die Motivation und den Spaß zu steigern. Besonders für Läuferinnen und Läufer mit beispielsweise Gelenkproblemen kann ein Überdenken und Anpassen des Untergrunds helfen. Letztlich ist wichtig, dass Läuferinnen und Läufer ihre Präferenzen kennenlernen und dort laufen, wo sie sich wohlfühlen und dass eine Beratung den passenden Schuh für den passenden Untergrund herausfiltert.",
      },
    ],
  },
  {
    slug: "dehnuebungen-fuer-laeufer",
    category: "Training",
    title: "Stretch it out",
    teaser: "Essenzielle Dehnübungen für Läuferinnen und Läufer.",
    author: "Lea Jung",
    blocks: [
      {
        type: "p",
        text: "Die Beinmuskulatur von Läuferinnen und Läufern ist regelmäßig stark beansprucht, schließlich ist sie für das Laufen unabdingbar. Um der Muskulatur genügend Erholung zu bieten, ist es wichtig regelmäßig einige Dehnübungen durchzuführen, die der Verletzungsvorbeugung und Regeneration dienen.",
      },
      {
        type: "p",
        text: "Dafür eignen sich besonders statische Dehnungen, die die Spannung in den Muskeln senken. Beim statischen Dehnen wird die Dehnung mindestens 30 Sekunden, aber am besten eine ganze Minute gehalten.",
      },
      {
        type: "h",
        text: "Essenzielle Dehnungen für die Beinmuskulatur",
      },
      {
        type: "h",
        text: "1. Die Wade",
      },
      {
        type: "p",
        text: "Die Waden sind beim Laufen ständig belastet, Verhärtungen oder Krämpfe sind für viele Läuferinnen und Läufer nicht unbekannt. Regelmäßiges Dehnen der Waden kann Abhilfe verschaffen und ist einfach durchzuführen.",
      },
      {
        type: "p",
        text: "In weiter Schrittstellung kann die hintere Wade gedehnt werden, das Hauptgewicht des Körpers lastet auf dem vorderen, gebeugten Bein, das hintere Bein wird gestreckt. Wichtig ist dabei, dass der hintere Fuß, besonders die Ferse, so nah wie möglich Richtung Boden gedrückt wird.",
      },
      {
        type: "p",
        text: "Eine weitere Möglichkeit die Wade besonders intensiv zu dehnen bietet das Anstellen des Fußes gegen beispielsweise eine Mauer, Laterne oder Wand. Der Fuß zeigt dabei so weit wie möglich senkrecht nach oben, die Hüfte reguliert die Intensität der Dehnung, indem sie für eine stärkere Dehnung näher Richtung Mauer geschoben wird.",
      },
      {
        type: "p",
        text: "Besonders beim Schienbeinkantensyndrom, auch bekannt als Shin Splints, kann regelmäßiges Wadendehnen hilfreich sein.",
      },
      {
        type: "h",
        text: "2. Der vordere Oberschenkel",
      },
      {
        type: "p",
        text: "Die Dehnung des vorderen Oberschenkels kann im Stehen vollzogen werden, wobei ein Bein gebeugt und der Fuß dieses Beins soweit wie möglich mit der Hand Richtung Gesäß gezogen wird. Der Oberkörper sollte dabei so gerade wie möglich bleiben, bei Gleichgewichtsproblemen kann sich auch mit einer Hand festgehalten werden. Wichtig ist, dass stets genug Spannung auf dem vorderen Oberschenkel gespürt wird.",
      },
      {
        type: "p",
        text: "Diese Dehnung kann auch im Liegen oder Knien durchgeführt werden. In Seitenlage wird der Ablauf der Dehnung im Stehen kopiert, kniend wird das vordere Bein im rechten Winkel aufgesetzt, das hintere Bein balanciert auf dem Knie, sodass der Unterschenkel und der Fuß an das Gesäß geführt werden kann. Auch hier ist es möglich sich eine Haltemöglichkeit für besseres Gleichgewicht zu suchen.",
      },
      {
        type: "h",
        text: "3. Der hintere Oberschenkel",
      },
      {
        type: "p",
        text: "Der hintere Oberschenkel kann besonders verletzungsanfällig sein, etwa für Muskelfaserrisse, da die drei Muskeln dort beim Laufen besonders stark für die Stabilisierung von Knie und Unterschenkel beansprucht werden.",
      },
      {
        type: "p",
        text: "Eine einfache Dehnübung zur Vorbeugung solcher Probleme ist das Herabdehnen aus dem Stehen. Dabei sollen die Beine so gerade wie möglich, also am besten komplett durchgestreckt werden, und die Hände Richtung Boden zeigen, idealerweise liegen die Handflächen auf dem Boden. Diese Dehnung kann variiert werden, indem die Beine nicht parallel nebeneinander gestellt, sondern überkreuzt werden. So kann die jeweilige Seite des durchgestreckten Beines besonders gedehnt werden.",
      },
      {
        type: "p",
        text: "Auch im Sitzen ist eine ähnliche Dehnung möglich, diese wird im Langsitz ausgeführt, das heißt beide Beine werden gerade ausgestreckt und der Oberkörper bleibt anfänglich gerade. Um eine Dehnung zu erzeugen wird der Oberkörper so weit wie möglich über die gestreckten Beine gebeugt, die Hände greifen Richtung Füße.",
      },
      {
        type: "p",
        text: "Eine angenehmere Variante dieser Dehnung, die einseitig dehnt, kann durch die seitliche Anwinklung eines Beines erreicht werden. Die Sohle des Fußes wird an die Innenseite des anderen Oberschenkels gedrückt, das Knie zeigt nach außen. Auch bei dieser Dehnung wird der Oberkörper nach vorne und somit unten geführt und die Hände in Richtung des Fußes gestreckt.",
      },
      {
        type: "p",
        text: "Das regelmäßige Einbringen der Dehnübungen nach dem Laufen dient der Erholung und Entspannung, ohne dass es viel Zeit beansprucht. Somit kann es mehrmals wöchentlich durchgeführt werden, ohne einen großen Aufwand zu verursachen.",
      },
      {
        type: "p",
        text: "Für Mobilisation, etwa vor dem Laufen, sind dynamische Übungen vorteilhaft. Hier werden die Dehnübungen durch beispielsweise Schwingen nur kurzzeitig gehalten, die Muskeln werden aktiviert.",
      },
    ],
  },
  {
    slug: "effektive-erholung-blackroll",
    category: "Training",
    title: "Effektive Erholung",
    teaser: "Drei Must-have-Produkte von Blackroll.",
    author: "Lea Jung",
    blocks: [
      {
        type: "p",
        text: "Läuferinnen und Läufer sollten auf keinen Fall vergessen, dass die beanspruchten Muskel der Beine, ob Oberschenkel oder Waden, und die Füße, die jeden Lauf alles geben, eine besondere Zuwendung verdienen. Optimal für die ideale Erholung, neben etwa klassischen Dehnübungen, ist die Verwendung der verschiedenen Faszien-Tools der Marke Blackroll zur Selbstmassage. Besonders für Einsteigerinnen und Einsteiger gibt es einige Tools, die die Begeisterung für die Selbstmassage garantiert auslösen werden.",
      },
      {
        type: "h",
        text: "Faszienrolle „Standard“",
      },
      {
        type: "p",
        text: "Diese Faszienrolle ist der Klassiker unter den Blackroll-Artikeln und aufgrund ihrer glatten Oberfläche eine gute Option für Einsteigerinnen und Einsteiger, um Verspannungen zu lösen. Durch ihre 30cm Länge ist sie besonders für größere Körperbereiche geeignet, also etwa für die Beine oder den Rücken. Mit langsamen Rollbewegungen dient sie der Regeneration, bei schnelleren fungiert sie aktivierend. Besonders für die Regeneration der Oberschenkel von Läuferinnen und Läufern ist diese Rolle ideal und bekämpft verhärtete oder verkrampfte Muskeln erfolgreich.",
      },
      {
        type: "h",
        text: "Faszienrolle „MINI“",
      },
      {
        type: "p",
        text: "Diese Rolle ist die Miniaturversion der Standard-Rolle, hat also somit ebenfalls eine glatte Oberfläche und kann sowohl regenerierend als auch aktivierend wirken. Durch ihre geringere Länge von15cm ist sie jedoch für kleinere Körperbereiche geeignet, etwa Füße oder Arme. Besonders die Fußsohlenmassage, die mit dieser Rolle durchgeführt werden kann, ist für Läuferinnen und Läufer ein Game-Changer. Ob im Stehen oder im Sitzen, das Ausrollen der Fußsohlen erzeugt ein ganz neues Gefühl der Entspannung in den Füßen- die selbst an einem Tag mit Laufpause ständig beansprucht werden. Eine ähnliche Wirkung für die Fußsohle kann übrigens auch mit dem Ball 08 erzeugt werden.",
      },
      {
        type: "h",
        text: "Duoball 08",
      },
      {
        type: "p",
        text: "Der Duoball ist vielseitig einsetzbar, etwa an Armen und Beinen, aber auch Nacken, Rücken und Schultern. Durch die Kombination beider Bälle können parallele Muskelstränge massiert werden, etwa am Rücken, ohne dass die Wirbelsäule dabei ein Problem darstellt. Durch diese spezielle Form ist der Duoball auch für eine Verwendung am Schienbein oder der Wade geeignet und kann besonders gezielt eingesetzt werden.",
      },
      {
        type: "p",
        text: "Die Blackroll-Produkte sind vielseitig einsetzbar, auf der Website oder der App der Marke sind weitere Einsatzbereiche und Übungen für jedes Tool zu finden. Auch spezielle Sets, die verschiedene Artikel kombinieren, können besonders für Einsteigerinnen und Einsteiger und auch Läuferinnen und Läufer einen guten Anfang bieten.",
      },
    ],
  },
  {
    slug: "40-jahre-ausdauer",
    category: "News",
    title: "40 Jahre AUSDAUER",
    teaser: "Eine Vision. Zwei Menschen. 40 Jahre Ausdauer.",
    author: null,
    blocks: [
      {
        type: "p",
        text: "Heute vor genau 40 Jahren haben Michael und Bettina Stern den Ausdauer Shop in Betzdorf eröffnet. Aus Michaels Vision wurde eine konkrete Idee – und aus dieser Idee ein Familienunternehmen, das wir heute in zweiter Generation weiterführen dürfen.",
      },
      {
        type: "p",
        text: "Michael brachte die Begeisterung und den Mut mit, etwas Eigenes aufzubauen. Bettina gestaltete diesen Weg von Anfang an mit: mit ihrem sorgfältigen Blick auf Zahlen und Finanzen und dem Gespür dafür, wie aus einer Vision ein Unternehmen mit Zukunft wird.",
      },
      {
        type: "p",
        text: "Was heute selbstverständlich erscheint, brauchte damals Menschen, die daran glaubten und Verantwortung übernahmen. Ihr habt gemeinsam das Fundament gelegt – für unseren Laden, für unsere Werte und für 40 Jahre voller Begegnungen und Bewegung.",
      },
      {
        type: "p",
        text: "Als Tochter Laura und Schwiegersohn Danny sind wir stolz und dankbar, eure Geschichte weiterschreiben zu dürfen. Eure Leidenschaft und eure Sorgfalt bleiben dabei unser Vorbild.",
      },
      {
        type: "p",
        text: "Danke, Michael und Bettina. Für euren Mut, eure Arbeit und für alles, was ihr gemeinsam aufgebaut habt.",
      },
      {
        type: "p",
        text: "Und danke an alle, die den Ausdauer Shop seit 40 Jahren begleiten. Ihr seid Teil dieser Geschichte!",
      },
      {
        type: "p",
        text: "Auf 40 Jahre Ausdauer – und auf alles, was noch kommt.",
      },
    ],
  },
  {
    slug: "westerwaelder-firmenlauf-2026",
    category: "News",
    title: "13. Westerwälder Firmenlauf",
    teaser: "Was. Für. Ein. Abend.",
    author: null,
    blocks: [
      {
        type: "p",
        text: "Der 13. Westerwälder Firmenlauf liegt hinter uns – und wir sind immer noch völlig geflasht!",
      },
      {
        type: "p",
        text: "Diese Stimmung auf und neben der Strecke, so viele Menschen in der Betzdorfer Innenstadt und eine Atmosphäre, die man in einem Video eigentlich kaum einfangen kann. Aber wir haben es zumindest versucht.",
      },
      {
        type: "p",
        text: "Die neue Strecke? Volltreffer.",
      },
      {
        type: "p",
        text: "Der neue Platz für die After Run Party? Genau die richtige Entscheidung.",
      },
      {
        type: "p",
        text: "Und IHR? Einfach der Wahnsinn!",
      },
      {
        type: "p",
        text: "Ihr habt gezeigt, was den Westerwälder Firmenlauf ausmacht: gemeinsam laufen, gemeinsam anfeuern und anschließend gemeinsam feiern.",
      },
      {
        type: "p",
        text: "Ein riesiges DANKE an alle Teilnehmenden, Unternehmen, Helfer:innen, Sponsoren, Partner und natürlich an alle, die an der Strecke und bei der After Run Party für diese unglaubliche Stimmung gesorgt haben.",
      },
      {
        type: "p",
        text: "Wir sehen uns 2027!",
      },
    ],
  },
];

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
