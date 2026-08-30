---
slug: microrebellion
no: 01
title: Microrebellion
standfirst: Four compromises in ciphra you could hold against me, and the one promise I won't negotiate.
topic: ciphra · zero-knowledge
date: 30 August 2026
---

ciphra writes decrypted health data to your device in plaintext. It sits in an IndexedDB store between login and logout. That is stated in our security model, under a paragraph that opens with: *"This is the part most users do not realise is there."*

It is in there because it is true, and because I did not go looking for a phrasing that made it sound less true.

A zero-knowledge app that caches plaintext sounds like a contradiction. It is one. I want to explain why I chose it, where I refuse to choose it, and where the compromise turned out to be bigger than it had to be.

## 01 — The cache | The perfect tool nobody uses

The cache does two things. First paint comes out of the local store before the network has answered, and entries whose ciphertext has not changed skip decryption on the way through. The calendar opens instead of stalling.

The reason I care is not benchmark pride. It is what happens when it stalls. The person stops using it. They go back to a spreadsheet, or to nothing.

**The technically perfect app is, in the worst case, unusable by someone who is already unwell.** A person managing a chronic condition does not have the evening energy for software that takes its principles more seriously than the human in front of it. That is not a UX question. It decides whether the data exists at all.

And there is the blunt arithmetic. If malware is running on the device, it makes little difference whether decryption happens in the frontend or one step earlier. The plaintext ends up on the same machine either way. The difference is only that the page is fast.

> [!warning] Where that argument stops
> It holds against active malware. It does not hold everywhere. Closing the tab clears the master key from `sessionStorage`, but the plaintext in IndexedDB stays until an explicit logout. Anyone who reaches the browser profile in that window — a shared machine, a border check, an IT department — finds readable entries.
>
> The cache stretches the exposure window from "this tab session" to "until you sign out". That is a real price, not zero. It is why logout wipes the database completely, and why there is a button that does the same without ending your session.

What I got wrong is how much of that price was necessary. Every cached record carries an `etag` so we can tell whether an entry changed — and that etag *is* the entry's ciphertext. The cache has been storing both copies of every document, encrypted and decrypted, side by side, since the day I wrote it.

> [!tip] The smaller version
> Drop the plaintext field. Decrypt from the etag that is already stored, with the master key that is already in `sessionStorage`. First paint survives, because it never depended on the network. The database gets *smaller*, because the redundant copy goes away.
>
> The window in the box above then closes on its own: once the tab is shut the master key is gone, and what is left on disk is ciphertext — exactly what the server already holds. Cold access to a browser profile stops being worth anything.
>
> The cost is one AES-256-GCM pass per warm load instead of a copy. AES-GCM is hardware-accelerated; for a heavy user that is tens of milliseconds, and it can be made imperceptible by decrypting the month in view first and the rest afterwards. The load path is already instrumented, so this is measurable before it is decided. That is the next change.

What does not change is the benchmark. It is not the whitepaper. It is what this person would otherwise use: a spreadsheet in someone else's cloud, an app that holds the key itself, or a paper notebook left on a train. Against any of those the compromise still wins. It just does not need to be as large as I was making it.

## 02 — The one bit | Deliberately one bit worse

Family access is supposed to let a relative see some entries and not others — not the diary, for instance. The clean design is: the server knows nothing, and the app honours the rule.

Except "the app honours it" is not enforcement. It is an assurance. And a document's type lives *inside* the ciphertext here, so the server cannot know what it is being asked to withhold.

So it gets one bit per document: shareable, or personal. Not the type, not the date, not the content. One bit. With it, the *server* can hold the line instead of politely respecting it.

> One bit off is still better than everything else that currently exists.

I weakened zero-knowledge by exactly one bit so that a caregiver could be given access without being handed the diary. Documents written before the decision carry no value at all and count as not shareable. When in doubt, closed.

## 03 — The pictures | A missing feature is also an answer

ciphra cannot upload images. Not because it would be hard, but because image upload on an open service creates an abuse problem I cannot honestly solve. Anyone offering uploads needs detection for child sexual abuse material. I do not have it.

The usual path is to ship it and move the responsibility into the terms of service.

**But people do not read terms and conditions.** A clause nobody reads does not protect users. It protects me. And misusing my own tool to cover myself does not help a single one of the people I built it for.

So the feature does not exist. Perhaps later, with mandatory client-side matching. Not today.

## 04 — The code | Either it is safe, or it is convenient

At registration you get twelve words. Shown once, roughly 99 bits of entropy. They restore the account.

Without them, nobody can. Not support. Not me.

That will eventually happen to someone who has nothing to spare — years of seizure records gone because a slip of paper is gone. I have no comforting version of that sentence.

What I have is the reason. That person was given a promise: *the server cannot read your data.* If I had a way to recover the account anyway, the promise was not merely imprecise, it was false — and everyone had been lied to from the start.

:::pull
Either it is **safe**, or it is **convenient**.
Claiming both at once is the lie.
:::

I chose safe, and I write the consequence down instead of hiding it in a help article.

## 05 — The weakness | Why it is in my own document

The security model contains a paragraph that attacks ciphra. In substance: a malicious operator — me — could serve tampered JavaScript and defeat zero-knowledge for a session. There is no reproducible build. This is the structural limit of every end-to-end application that runs in a browser.

Writing that down costs something. It is the paragraph a sceptical reader will quote back at me.

The same document also gets something wrong. It claims the cache lets us skip "the Argon2 + AES-GCM step". Argon2 never runs there — it runs at registration, at login, at a password change, at account deletion, and nowhere else. Inside a live session the key is already in memory and a page load derives nothing. That sentence has been wrong since I wrote it, it overstated what the cache was buying, and it is being fixed. A document that invites you to check it has to survive being checked.

It stays because it is true, and because almost nobody else writes it. Half the industry sells browser-based encryption as a closed promise, while everyone who has built one knows about this gap. It is the unspoken truth of the whole field.

Call it **microrebellion**. No manifesto, no movement. Just the decision to write down what is already known instead of leaving it out — and to ship the verification steps alongside it: `cosign verify`, the DevTools checks, the line numbers.

## Conclusion | Where the line runs

From outside, these decisions look inconsistent. On the cache I give ground. On the one bit I give ground. On the recovery code I give nothing, even though that is where it hurts most.

The difference is what is at stake.

**On engineering I negotiate.** It is not measured against an ideal but against what the person would otherwise use. A compromise that produces a usable tool beats a pure solution left on the shelf — and when it turns out to be bigger than it had to be, it gets made smaller and said out loud.

**On promises I do not negotiate.** A promise that needs a clause to survive is not an assurance. It is a lie with a reference number.

That is why the cache is allowed to exist and the recovery code is not allowed to be reset. Every compromise lands on my side of the line. Every promise stays whole.
