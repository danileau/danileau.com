---
slug: microrebellion
no: 01
title: Mikrorebellion
standfirst: Vier Kompromisse in ciphra, die man mir vorwerfen kann — und das eine Versprechen, das ich nicht verhandle.
topic: ciphra · Zero-Knowledge
date: 30. August 2026
---

ciphra legt entschlüsselte Gesundheitsdaten im Klartext auf deinem Gerät ab. In einer IndexedDB, zwischen Login und Logout. Genau so steht es in unserem Security-Model, unter einem Absatz, der anfängt mit: *„Das ist der Teil, den die meisten nicht bemerken."*

Es steht dort, weil es stimmt. Und weil ich keine Formulierung gesucht habe, mit der es weniger wahr klingt.

Eine Zero-Knowledge-App, die Klartext cached, klingt nach einem Widerspruch. Ist es auch. Ich will erklären, warum ich ihn gewählt habe, wo ich das gerade nicht tue, und wo der Kompromiss grösser war, als er sein musste.

## 01 — Der Cache | Das perfekte Werkzeug, das niemand benutzt

Der Cache macht zwei Dinge. Der erste Bildaufbau kommt aus dem lokalen Speicher, bevor das Netz geantwortet hat, und Einträge, deren Chiffrat sich nicht geändert hat, überspringen die Entschlüsselung. Der Kalender geht auf, statt zu stocken.

Der Grund, warum mich das kümmert, ist nicht Benchmark-Stolz. Es ist das, was passiert, wenn es stockt. Die Person hört auf, es zu benutzen. Sie geht zurück zur Tabelle, oder zu gar nichts.

**Die technisch perfekte App ist im schlechtesten Fall unbenutzbar für jemanden, dem es ohnehin schon schlecht geht.** Wer chronisch krank ist, hat abends nicht die Energie für Software, die ihre Prinzipien wichtiger nimmt als den Menschen davor. Das ist keine UX-Frage. Sie entscheidet, ob die Daten überhaupt entstehen.

Dazu kommt die nüchterne Rechnung. Wenn auf dem Gerät Schadsoftware läuft, ist es weitgehend egal, ob die Entschlüsselung im Frontend passiert oder einen Schritt davor. Der Klartext landet so oder so auf derselben Maschine. Der Unterschied ist nur, dass die Seite schnell ist.

> [!warning] Wo dieses Argument aufhört
> Es gilt gegen aktive Schadsoftware. Es gilt nicht überall. Beim Schliessen des Tabs verschwindet der Master-Key aus dem `sessionStorage`, der Klartext in der IndexedDB aber bleibt — bis zum ausdrücklichen Logout. Wer in diesem Fenster an das Browser-Profil kommt — ein geteilter Rechner, eine Grenzkontrolle, eine IT-Abteilung — findet lesbare Einträge.
>
> Der Cache verlängert das Fenster von „diese Tab-Sitzung" auf „bis du dich abmeldest". Das ist ein echter Preis, nicht null. Deshalb wischt Logout die Datenbank vollständig, und deshalb gibt es einen Knopf, der dasselbe tut, ohne die Sitzung zu beenden.

Was ich falsch hatte, ist, wie viel von diesem Preis nötig war. Jeder Cache-Eintrag trägt ein `etag`, damit wir erkennen, ob sich ein Eintrag geändert hat — und dieses etag *ist* das Chiffrat des Eintrags. Der Cache speichert seit dem Tag, an dem ich ihn geschrieben habe, beide Kopien jedes Dokuments nebeneinander, verschlüsselt und entschlüsselt.

> [!tip] Die kleinere Variante
> Das Klartextfeld weglassen. Aus dem etag entschlüsseln, das ohnehin schon gespeichert ist, mit dem Master-Key, der ohnehin schon im `sessionStorage` liegt. Der erste Bildaufbau bleibt, weil er nie vom Netz abhing. Die Datenbank wird *kleiner*, weil die doppelte Kopie wegfällt.
>
> Das Fenster aus dem Kasten oben schliesst sich dann von selbst: Ist der Tab zu, ist der Master-Key weg, und auf der Platte liegt Chiffrat — genau das, was der Server ohnehin hat. Kalter Zugriff auf ein Browser-Profil ist damit nichts mehr wert.
>
> Der Preis ist ein AES-256-GCM-Durchgang pro warmem Laden statt einer Kopie. AES-GCM ist hardwarebeschleunigt; für eine Vielnutzerin sind das Zehntelsekunden, und es lässt sich unmerklich machen, indem zuerst der sichtbare Monat entschlüsselt wird und der Rest danach. Der Ladepfad ist bereits instrumentiert, das ist also messbar, bevor es entschieden wird. Das ist die nächste Änderung.

Was sich nicht ändert, ist der Massstab. Es ist nicht das Whitepaper. Es ist das, was diese Person sonst benutzen würde: eine Tabelle in fremder Cloud, eine App, die den Schlüssel selbst hält, oder ein Notizbuch, das im Zug liegen bleibt. Gegen jedes davon gewinnt der Kompromiss immer noch. Er muss nur nicht so gross sein, wie ich ihn gemacht habe.

## 02 — Das eine Bit | Absichtlich ein Bit schlechter

Der Familienzugriff soll Angehörigen erlauben, bestimmte Einträge zu sehen und andere nicht — das Tagebuch zum Beispiel nicht. Der saubere Entwurf lautet: Der Server weiss nichts, und die App hält sich an die Regel.

Nur ist „die App hält sich daran" keine Durchsetzung. Es ist eine Zusage. Und der Typ eines Dokuments liegt hier *innerhalb* des Chiffrats, der Server kann also gar nicht wissen, was er zurückhalten soll.

Also bekommt er ein Bit pro Dokument: teilbar oder persönlich. Nicht den Typ, nicht das Datum, nicht den Inhalt. Ein Bit. Damit kann der *Server* die Grenze halten, statt sie höflich zu respektieren.

> Ein Bit daneben ist immer noch besser als alles, was es sonst gerade gibt.

Ich habe Zero-Knowledge um exakt ein Bit geschwächt, damit eine Betreuerin Zugriff bekommt, ohne dass ihr das Tagebuch mitgegeben wird. Dokumente, die vor dieser Entscheidung entstanden sind, tragen den Wert gar nicht und gelten als nicht teilbar. Im Zweifel geschlossen.

## 03 — Die Bilder | Eine fehlende Funktion ist auch eine Antwort

ciphra kann keine Bilder hochladen. Nicht weil es schwierig wäre, sondern weil Bild-Upload bei einem offenen Dienst ein Missbrauchsproblem erzeugt, das ich nicht ehrlich lösen kann. Wer Uploads anbietet, braucht Erkennung von Missbrauchsmaterial. Ich habe die nicht.

Der übliche Weg ist, es trotzdem auszuliefern und die Verantwortung in die AGB zu schieben.

**Aber Leute lesen keine AGB.** Eine Klausel, die niemand liest, schützt nicht die Nutzerinnen. Sie schützt mich. Und mein eigenes Werkzeug zu missbrauchen, um mich abzusichern, hilft keinem einzigen der Menschen, für die ich es gebaut habe.

Also gibt es die Funktion nicht. Vielleicht später, mit verpflichtendem clientseitigem Abgleich. Heute nicht.

## 04 — Der Code | Entweder sicher, oder bequem

Bei der Registrierung bekommst du zwölf Wörter. Einmal gezeigt, rund 99 Bit Entropie. Damit lässt sich der Account wiederherstellen.

Ohne sie kann das niemand. Kein Support. Auch ich nicht.

Das wird irgendwann jemanden treffen, der nichts zu verschenken hat — Jahre an Anfallsprotokollen weg, weil ein Zettel weg ist. Ich habe keine tröstliche Fassung dieses Satzes.

Was ich habe, ist der Grund. Diese Person hat ein Versprechen bekommen: *Der Server kann deine Daten nicht lesen.* Hätte ich einen Weg, den Account trotzdem zurückzuholen, wäre dieses Versprechen nicht bloss ungenau gewesen, sondern falsch — und alle wären von Anfang an angelogen worden.

:::pull
Entweder es ist **sicher**, oder es ist **bequem**.
Beides gleichzeitig zu behaupten, ist die Lüge.
:::

Ich habe mich für sicher entschieden, und ich schreibe die Konsequenz hin, statt sie in einem Hilfetext zu verstecken.

## 05 — Die Schwachstelle | Warum sie im eigenen Dokument steht

Im Security-Model steht ein Absatz, der ciphra angreift. Sinngemäss: Ein bösartiger Betreiber — also ich — könnte manipuliertes JavaScript ausliefern und Zero-Knowledge für eine Sitzung aushebeln. Einen reproduzierbaren Build gibt es nicht. Das ist die strukturelle Grenze jeder E2E-Anwendung, die im Browser läuft.

Das hinzuschreiben kostet etwas. Es ist der Absatz, den ein skeptischer Leser mir vorhalten wird.

Dasselbe Dokument hat auch etwas falsch. Es behauptet, der Cache erspare uns „den Argon2- und AES-GCM-Schritt". Argon2 läuft dort nie — es läuft bei der Registrierung, beim Login, beim Passwortwechsel, beim Löschen des Kontos, und sonst nirgends. Innerhalb einer laufenden Sitzung liegt der Schlüssel bereits im Speicher, ein Seitenaufruf leitet nichts ab. Dieser Satz war falsch, seit ich ihn geschrieben habe, er hat überzeichnet, was der Cache einbringt, und er wird korrigiert. Ein Dokument, das zum Nachprüfen einlädt, muss das Nachprüfen überstehen.

Er bleibt drin, weil er stimmt, und weil ihn sonst fast niemand hinschreibt. Die halbe Branche verkauft browserbasierte Verschlüsselung als abgeschlossenes Versprechen, obwohl jeder, der so etwas gebaut hat, diese Lücke kennt. Das ist die unausgesprochene Wahrheit im ganzen Feld.

Nennen wir es **Mikrorebellion**. Kein Manifest, keine Bewegung. Nur der Beschluss, das Bekannte aufzuschreiben, statt es wegzulassen — und die Prüfschritte gleich mitzuliefern: `cosign verify`, die DevTools-Kontrollen, die Zeilennummern.

## Fazit | Wo die Linie verläuft

Von aussen sehen diese Entscheidungen widersprüchlich aus. Beim Cache gebe ich nach. Beim einen Bit gebe ich nach. Beim Wiederherstellungscode gebe ich nichts, obwohl es dort am meisten weh tut.

Der Unterschied ist, worum es geht.

**Bei der Technik verhandle ich.** Sie wird nicht an einem Ideal gemessen, sondern an dem, was die Person sonst benutzen würde. Ein Kompromiss, der ein brauchbares Werkzeug ergibt, schlägt eine reine Lösung, die im Regal bleibt — und wenn er grösser war als nötig, wird er kleiner gemacht und das laut gesagt.

**Beim Versprechen verhandle ich nicht.** Ein Versprechen, das eine Klausel braucht, um zu überleben, ist keine Zusage. Es ist eine Lüge mit Aktenzeichen.

Deshalb darf der Cache existieren und der Wiederherstellungscode nicht zurückgesetzt werden. Jeder Kompromiss geht auf meine Seite der Linie. Jede Zusage bleibt ganz.
