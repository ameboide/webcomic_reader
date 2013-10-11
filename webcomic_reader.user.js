(function(){
var defaultSettings = {
	prefetchNext: 5, //number of prefetched pages ahead
	prefetchBack: 5, //number of prefetched pages behind
	prefetchNextStart: 2, //number of prefetched pages ahead when the script starts
	prefetchBackStart: 1, //number of prefetched pages behind when the script starts
	prefetchNoNext: true, //specifies if previous page should be prefetched when theres no next page
	fullLayout: true, //true for full layout mode, false for minimalistic mode
	clikLeftHalfGoesBack: true, //specifies if clicking the left half of the image will take you to the previous page
	flipControlsManga: false, //flip the controls (L/R arrows, L/R image click, back/next buttons) for mangas or other right-to-left content
	autozoom: false, //enable fit-to-screen
	shrinkWidth: false, //when fit-to-screen enabled and image too wide, shrink it
	shrinkHeight: false, //when fit-to-screen enabled and image too long, shrink it
	expandWidth: false, //when fit-to-screen enabled and image too narrow, expand it
	expandHeight: false, //when fit-to-screen enabled and image too short, expand it
	showButtons: true, //show or hide the buttons (back/next, bookmarks, settings, etc...)
	borderLR: 0, //pixels to leave as border to the sides of the image when zooming and scrolling
	borderUD: 0, //pixels to leave as border above and below the image when zooming and scrolling
	goToBookmark: true, //if you have 1 bookmark saved for a site, asks you if you want to go there when you visit the site
	moveWhileLoading: false, //lets you change pages even if the image for the next page is still loading
	debugMode: false, //alerts on errors, and shows some of the currently cache'd pages/images with the "," key
	showSettingsOnFail: false, //if no settings are found for this site and default ones didn't work, show settings screen
	keyboardShortcuts: { //keyboard shortcuts...
		back: {name: 'LEFT', keyCode: 37, ctrlKey: false, shiftKey: false, altKey: false},
		next: {name: 'RIGHT', keyCode: 39, ctrlKey: false, shiftKey: false, altKey: false},
		scroll_left: {name: 'CTRL + LEFT', keyCode: 37, ctrlKey: true, shiftKey: false, altKey: false},
		scroll_right: {name: 'CTRL + RIGHT', keyCode: 39, ctrlKey: true, shiftKey: false, altKey: false},
		scroll_up: {name: 'CTRL + UP', keyCode: 38, ctrlKey: true, shiftKey: false, altKey: false},
		scroll_down: {name: 'CTRL + DOWN', keyCode: 40, ctrlKey: true, shiftKey: false, altKey: false},
		reload: {name: '.', keyCode: 190, ctrlKey: false, shiftKey: false, altKey: false},
		set_bm: {name: 'CTRL + ALT + B', keyCode: 66, ctrlKey: true, shiftKey: false, altKey: true},
		add_bm: {name: 'CTRL + ALT + A', keyCode: 65, ctrlKey: true, shiftKey: false, altKey: true},
		layout: {name: '-', keyCode: isWebKit() ? 189 : 173, ctrlKey: false, shiftKey: false, altKey: false},
		botones: {name: 'SHIFT + -', keyCode: isWebKit() ? 189 : 173, ctrlKey: false, shiftKey: true, altKey: false},
		fit: {name: '+', keyCode: isWebKit() ? 187 : 171, ctrlKey: false, shiftKey: false, altKey: false},
		slide: {name: 'CTRL + ALT + S', keyCode: 83, ctrlKey: true, shiftKey: false, altKey: true},
		debug_mode: {name: 'CTRL + ALT + X', keyCode: 88, ctrlKey: true, shiftKey: false, altKey: true},
		debug_info: {name: ',', keyCode: 188, ctrlKey: false, shiftKey: false, altKey: false}
	}
};

// ==UserScript==
// @name           Webcomic Reader
// @author         ameboide
// @version        2013.10.10
// @namespace      http://userscripts.org/scripts/show/59842
// @description    Can work on almost any webcomic/manga page, preloads 5 or more pages ahead (or behind), navigates via ajax for instant-page-change, lets you use the keyboard, remembers your progress, and it's relatively easy to add new sites
// @lastchanges    added 7 sites
// @updatetype     8
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_registerMenuCommand
// @grant          GM_openInTab
// @updateURL      https://userscripts.org/scripts/source/59842.meta.js
// @include        http://www.sluggy.com/*
// @include        http://sluggy.com/*
// @include        http://www.penny-arcade.com/comic*
// @include        http://penny-arcade.com/comic*
// @include        http://www.xkcd.com/*
// @include        http://xkcd.com/*
// @include        http://www.xkcd.org/*
// @include        http://xkcd.org/*
// @include        http://www.xkcd.net/*
// @include        http://xkcd.net/*
// @include        https://www.xkcd.com/*
// @include        https://xkcd.com/*
// @include        http://www.giantitp.com/*
// @include        http://www.dilbert.com/*
// @include        http://dilbert.com/*
// @include        http://hf.dilbert.com/*
// @include        http://www.explosm.net/*
// @include        http://explosm.net/*
// @include        http://www.nuklearpower.com/*
// @include        http://www.reallifecomics.com/*
// @include        http://reallifecomics.com/*
// @include        http://www.pvponline.com/*
// @include        http://pvponline.com/*
// @include        http://www.brawlinthefamily.com/*
// @include        http://drmcninja.com/*
// @include        http://www.vgcats.com/*/*
// @include        http://www.phdcomics.com/*
// @include        http://www.cad-comic.com/*
// @include        http://www.smbc-comics.com/*
// @include        http://abstrusegoose.com/*
// @include        http://thedoghousediaries.com/*
// @include        http://www.erfworld.com/*
// @include        http://es.juanelo.net/*/*
// @include        http://www.mangastream.com/*
// @include        http://mangastream.com/*
// @include        http://readms.com/*
// @include        http://www.qwantz.com/*
// @include        http://qwantz.com/*
// @include        http://www.2pstart.com/*/*
// @include        http://www.spaceavalanche.com/*
// @include        http://www.gunshowcomic.com/*
// @include        http://gunshowcomic.com/*
// @include        http://www.terrorisland.net/*
// @include        http://nedroid.com/*
// @include        http://manga.animea.net/*
// @include        http://www.bobandgeorge.com/*
// @include        http://bobandgeorge.com/*
// @include        http://www.shamusyoung.com/*
// @include        http://www.stationv3.com/*
// @include        http://www.lfgcomic.com/page/*
// @include        http://lfgcomic.com/page/*
// @include        http://www.gpf-comics.com/*
// @include        http://www.questionablecontent.net/*
// @include        http://questionablecontent.net/*
// @include        http://miscellanea.wellingtongrey.net/*
// @include        http://www.daisyowl.com/*
// @include        http://daisyowl.com/*
// @include        http://www.hyperdeathbabies.com/*
// @include        http://www.kyo.cn/Viewcartoon/*
// @include        http://www.mangatoshokan.com/*
// @include        http://amultiverse.com/*
// @include        http://wondermark.com/*
// @include        http://www.amazingsuperpowers.com/*
// @include        http://www.anymanga.com/*
// @include        http://anymanga.com/*
// @include        http://mangafox.me/*
// @include        http://www.leasticoulddo.com/*
// @include        http://leasticoulddo.com/*
// @include        http://www.sinfest.net/*
// @include        http://www.crfh.net/*
// @include        http://crfh.net/*
// @include        http://www.pennyandaggie.com/*
// @include        http://pennyandaggie.com/*
// @include        http://www.darkbolt.com/*
// @include        http://darkbolt.com/*
// @include        http://www.egscomics.com/*
// @include        http://egscomics.com/*
// @include        http://www.the-gutters.com/*
// @include        http://www.punchanpie.net/*
// @include        http://punchanpie.net/*
// @include        http://noneedforbushido.com/*
// @include        http://www.teahousecomic.com/*
// @include        http://www.applegeeks.com/*
// @include        http://applegeeks.com/*
// @include        http://www.mangareader.net/*
// @include        http://stoptazmo.com/*
// @include        http://www.arcamax.com/*
// @include        http://www.nettserier.no/*
// @include        http://nettserier.no/*
// @include        http://disneycomics.free.fr/*/show.php?*
// @include        http://www.nerfnow.com/*
// @include        http://nerfnow.com/*
// @exclude        http://www.nerfnow.com/*/comments*
// @exclude        http://nerfnow.com/*/comments*
// @include        http://www.virtualshackles.com/*
// @include        http://www.little-gamers.com/*
// @include        http://www.digitalunrestcomic.com/*
// @include        http://digitalunrestcomic.com/*
// @include        http://www.duelinganalogs.com/*
// @include        http://www.actiontrip.com/*
// @include        http://actiontrip.com/*
// @include        http://www.myextralife.com/*
// @include        http://www.mondaynightcrew.com/*
// @include        http://mondaynightcrew.com/*
// @include        http://notinventedhe.re/*
// @include        http://www.unshelved.com/*
// @include        https://www.eviscerati.org/comics*
// @include        http://read.mangashare.com/*
// @include        http://haven-reader.net/*
// @include        http://www.manga2u.me/*
// @include        http://manga2u.me/*
// @include        http://buttersafe.com/*
// @include        http://www.romanticallyapocalyptic.com/*
// @include        http://romanticallyapocalyptic.com/*
// @include        http://www.somethingpositive.net/*
// @include        http://somethingpositive.net/*
// @include        http://www.rhymes-with-witch.com/*
// @include        http://rhymes-with-witch.com/*
// @include        http://www.superstupor.com/*
// @include        http://superstupor.com/*
// @include        http://www.misfile.com/*
// @include        http://www.asofterworld.com/*
// @include        http://asofterworld.com/*
// @include        http://www.achewood.com/*
// @include        http://achewood.com/*
// @include        http://www.act-i-vate.com/*
// @include        http://act-i-vate.com/*
// @include        http://www.biggercheese.com/*
// @include        http://biggercheese.com/*
// @include        http://www.gwscomic.com/*
// @include        http://gwscomic.com/*
// @include        http://www.fonflatter.de/*
// @include        http://www.ruthe.de/*
// @include        http://ruthe.de/*
// @include        http://www.daybydaycartoon.com/*
// @include        http://daybydaycartoon.com/*
// @include        http://www.dieselsweeties.com/*
// @include        http://dieselsweeties.com/*
// @include        http://www.foxtrot.com/*
// @include        http://www.csectioncomics.com/*
// @include        http://garfieldminusgarfield.net/*
// @include        http://www.girlgeniusonline.com/*
// @include        http://www.gocomics.com/*
// @exclude        http://www.gocomics.com/
// @exclude        http://www.gocomics.com/?*
// @include        http://www.gunnerkrigg.com/*
// @include        http://www.ho-lo.co.il/*
// @include        http://www.jeffzugale.com/*
// @include        http://www.threepanelsoul.com/*
// @include        http://threepanelsoul.com/*
// @include        http://www.oglaf.com/*
// @include        http://oglaf.com/*
// @include        http://www.kevinandkell.com/*
// @include        http://kevinandkell.com/*
// @include        http://kittyhawkcomic.com/*
// @include        http://www.lackadaisycats.com/comic.php*
// @include        http://lackadaisycats.com/comic.php*
// @include        http://www.lukesurl.com/*
// @include        http://mycardboardlife.com/*
// @include        http://megatokyo.com/*
// @include        http://www.megatokyo.it/*
// @include        http://www.megatokyo.de/*
// @include        http://ex2.unixmanga.net/*
// @include        http://allmymanga.com/*
// @include        http://noreasoncomics.com/*
// @include        http://www.pixelcomic.net/*
// @include        http://pixelcomic.net/*
// @include        http://www.redmeat.com/*
// @include        http://redmeat.com/*
// @include        http://sexylosers.com/*
// @include        http://www.doonesbury.com/*
// @include        http://stalebacon.com/*
// @include        http://www.mangaeden.com/*
// @include        http://www.pbfcomics.com/*
// @include        http://tjandamal.com/*
// @include        http://sfeertheory.littlefoolery.com/*
// @include        http://wanderingones.com/*
// @include        http://www.big-big-truck.com/ayiw/*
// @include        http://big-big-truck.com/ayiw/*
// @include        http://wapsisquare.com/*
// @include        http://www.wastedtalent.ca/*
// @include        http://www.wulffmorgenthaler.com/*
// @include        http://wulffmorgenthaler.com/*
// @include        http://www.weregeek.com/*
// @include        http://*.katbox.net/*
// @include        http://*.keenspace.com/*
// @include        http://*.comicgenesis.com/*
// @include        http://www.beanleafpress.com/*
// @include        http://gipcomic.com/*
// @include        http://www.theoswaldchronicles.com/*
// @include        http://www.awkwardzombie.com/*
// @include        http://awkwardzombie.com/*
// @include        http://www.stainedglasssamurai.com/*
// @include        http://stainedglasssamurai.com/*
// @include        http://*.seraph-inn.com/*
// @include        http://www.fakku.net/manga/*
// @include        http://www.fakku.net/doujinshi/*
// @include        http://www.deadwinter.cc/*
// @include        http://deadwinter.cc/*
// @include        http://www.loveisintheblood.com/*
// @include        http://rhapsodies.wpmorse.com/*
// @include        http://www.piratesofmars.com/*
// @include        http://www.soulless-comic.com/*
// @include        http://www.earthsongsaga.com/vol*
// @include        http://rainchildstudios.com/strawberry/*
// @include        http://www.goblinscomic.com/*
// @include        http://www.venusenvycomic.com/*
// @include        http://venusenvycomic.com/*
// @include        http://www.meekcomic.com/*
// @include        http://www.dominic-deegan.com/*
// @include        http://dominic-deegan.com/*
// @include        http://yafgc.net/*
// @include        http://www.sdamned.com/*
// @include        http://www.twolumps.net/*
// @include        http://twolumps.net/*
// @include        http://www.precociouscomic.com/*
// @include        http://precociouscomic.com/*
// @include        http://betweenplaces.spiderforest.com/*
// @include        http://specialschool.spiderforest.com/*
// @include        http://requiem.spiderforest.com/*
// @include        http://sevensmith.net/chirault/*
// @include        http://www.junglestudio.com/roza/*
// @include        http://www.dream-scar.net/*
// @include        http://dream-scar.net/*
// @include        http://www.tryinghuman.com/*
// @include        http://tryinghuman.com/*
// @include        http://www.thedreamercomic.com/*
// @include        http://thedreamercomic.com/
// @include        http://www.shazzbaa.com/*
// @include        http://shazzbaa.com/*
// @include        http://www.sandraandwoo.com/*
// @include        http://www.freakangels.com/*
// @include        http://comics.com/*
// @include        http://www.sakanacomic.com/*
// @include        http://www.jaygeefisher.com/*
// @include        http://jaygeefisher.com/*
// @include        http://www.doujin-moe.us/*
// @include        http://keychain.patternspider.net/*
// @include        http://www.collectedcurios.com/*
// @include        http://www.doomies.com/*
// @include        http://doomies.com/*
// @include        http://www.qgmindpolice.com/*
// @include        http://www.slowwave.com/*
// @include        http://slowwave.com/*
// @include        http://www.sylvanmigdal.com/*
// @include        http://sylvanmigdal.com/*
// @include        http://www.c.urvy.org/*
// @include        http://c.urvy.org/*
// @include        http://www.the-artiste.net/*
// @include        http://www.doublefine.com/*
// @include        http://wwww.survivingtheworld.net/*
// @include        http://survivingtheworld.net/*
// @include        http://view.thespectrum.net/*
// @include        http://www.mangavolume.com/*
// @include        http://nonadventures.com/*
// @include        http://www.robandelliot.cycomics.com/*
// @include        http://robandelliot.cycomics.com/*
// @include        http://soulsymphonycomic.com/*
// @include        http://www.blastwave-comic.com/*
// @include        http://www.channelate.com/*
// @include        http://www.picturesforsadchildren.com/*
// @include        http://picturesforsadchildren.com/*
// @include        http://www.optipess.com/*
// @include        http://www.drawuntilitsfunny.com/*
// @include        http://beardfluff.com/*
// @include        http://lawlscomic.com/*
// @include        http://www.maakies.com/*
// @include        http://www.lefthandedtoons.com/*
// @include        http://trollscience.com/*
// @include        http://www.diggercomic.com/*
// @include        http://luciphurrsimps.com/*
// @include        http://nikkisprite.com/*
// @include        http://planet-nowhere.com/*
// @include        http://www.mysisterthefreak.com/*
// @include        http://www.gronkcomic.com/*
// @include        http://www.redsplanet.com/*
// @include        http://www.cowshell.com/*
// @include        http://everblue-comic.com/*
// @include        http://tmkcomic.depleti.com/*
// @include        http://www.remindblog.com/*
// @include        http://inkdolls.com/*
// @include        http://www.terra-comic.com/*
// @include        http://lovecraftismissing.com/*
// @include        http://www.redmoonrising.org/*
// @include        http://www.khaoskomix.com/*
// @include        http://ipaintgirls.com/*
// @include        http://memoria.valice.net/*
// @include        http://www.twilightlady.com/*
// @include        http://submanga.com/*
// @include        http://g.e-hentai.org/*
// @include        http://animesquish.com/*
// @include        http://crazytje.be/*
// @include        http://www.tenmangas.com/*
// @include        http://tenmangas.com/*
// @include        http://www.tenmanga.com/*
// @include        http://tenmanga.com/*
// @include        http://www.perveden.com/*
// @include        http://reader.imangascans.org/*
// @include        http://www.ekkifu.com/*
// @include        http://www.bittersweetcandybowl.com/*
// @include        http://www.doujintoshokan.com/*
// @include        http://www.imagebam.com/*
// @include        http://www.exploitationnow.com/*
// @include        http://www.otakuworks.com/*
// @include        http://h-manga.info/*
// @include        http://basicinstructions.net/*
// @include        http://www.insaneyetisquirrel.com/*
// @include        http://*.kukudm.com/comiclist/*/*/*
// @include        http://*.kukudm.net/comiclist/*/*/*
// @include        http://mh.socomic.com/comiclist/*/*/*
// @include        http://www.socomic.net/comiclist/*/*/*
// @include        http://www.webcomicsnation.com/*
// @include        http://www.pawn.se/*
// @include        http://www.rpgworldcomic.com/*
// @include        http://rpgworldcomic.com/*
// @include        http://maskedretriever.com/*
// @include        http://www.missmab.com/*
// @include        http://www.lookwhatibroughthome.com/*
// @include        http://hijinksensue.com/*
// @include        http://www.darthsanddroids.net/*
// @include        http://darthsanddroids.net/*
// @include        http://www.harkavagrant.com/*
// @include        http://www.turbosloth.net/*
// @include        http://turbosloth.net/*
// @include        http://www.walkinginsquares.com/*
// @include        http://walkinginsquares.com/*
// @include        http://dresdencodak.com/*
// @include        http://www.straysonline.com/comic/*
// @include        http://straysonline.com/comic/*
// @include        http://www.emi-art.com/*
// @include        http://emi-art.com/*
// @include        http://www.dragonball-multiverse.com/*
// @include        http://insanesoft.org/fanfyria/*
// @include        http://*.snafu-comics.com/*
// @include        http://www.wayfarersmoon.com/*
// @include        http://wayfarersmoon.com/*
// @include        http://*.smackjeeves.com/*
// @include        http://www.10kcommotion.com/*
// @include        http://10kcommotion.com/*
// @include        http://somemangas.com/*
// @include        http://www.multiplexcomic.com/*
// @include        http://multiplexcomic.com/*
// @include        http://www.johnandjohn.nl/index.php?*wltypeid=1*
// @include        http://www.sorcery101.net/*
// @include        http://www.treadingground.com/*
// @include        http://www.jerkcity.com/*
// @include        http://jerkcity.com/*
// @include        http://www.kiwiblitz.com/*
// @include        http://thepunchlineismachismo.com/*
// @include        http://kafkaskoffee.com/*
// @include        http://www.out-at-home.com/*
// @include        http://occasionalcomics.com/*
// @include        http://www.zombieboycomics.com/*
// @include        http://www.babyblues.com/*
// @include        http://babyblues.com/*
// @include        http://www.bearandtiger.com/*
// @include        http://mangatopia.net/*
// @include        http://exhentai.org/*
// @include        http://www.wigucomics.com/*
// @include        http://www.mankin-trad.net/*
// @include        http://mankin-trad.net/*
// @include        http://www.mangahere.com/*
// @include        http://es.mangahere.com/*
// @include        http://www.scarygoround.com/*
// @include        http://scarygoround.com/*
// @include        http://www.schlockmercenary.com/*
// @include        http://www.warehousecomic.com/*
// @include        http://warehousecomic.com/*
// @include        http://www.tnemrot.com/*
// @include        http://www.holiday-wars.com/*
// @include        http://www.zapcomic.com/*
// @include        http://www.twokinds.net/*
// @include        http://twokinds.net/*
// @include        http://www.dumbingofage.com/*
// @include        http://www.shortpacked.com/*
// @include        http://www.itswalky.com/*
// @include        http://itswalky.com/*
// @include        http://www.evildivacomics.com/*
// @include        http://axecop.com/*
// @include        http://www.somethingofthatilk.com/*
// @include        http://somethingofthatilk.com/*
// @include        http://imgur.com/*
// @include        http://www.reddit.com/
// @include        http://www.reddit.com/?*
// @include        http://www.reddit.com/r/*
// @exclude        http://www.reddit.com/*/comments/*
// @include        http://blankitcomics.com/*
// @include        http://www.anime-source.com/*
// @include        http://anime-source.com/*
// @include        http://www.mangarush.com/*
// @include        http://www.citymanga.com/*/*/*
// @include        http://citymanga.com/*/*/*
// @include        http://www.dctp.ws/*/V*.html
// @include        http://dctp.ws/*/V*.html
// @include        http://dctpws.thetrogdor.com/*
// @include        http://doctorcatmd.com/*
// @include        http://www.sheldoncomics.com/*
// @include        http://sheldoncomics.com/*
// @include        http://luscious.net/*/pictures/*
// @include        http://old.lu.scio.us/hentai/albums/*
// @exclude        http://old.lu.scio.us/hentai/albums/*/page/*
// @include        http://www.geekculture.com/joyoftech/*
// @include        http://www.basketcasecomix.com/*
// @include        http://www.geeklifecomic.com/*
// @include        http://www.realmofatland.com/*
// @include        http://realmofatland.com/*
// @include        http://thedoujin.com/index.php?page=post&s=view&id=*
// @include        http://eatmanga.com/*
// @include        http://www.oslevadosdabreca.com/*
// @include        http://www.thedevilbear.com/*
// @include        http://thedevilbear.com/*
// @include        http://www.bladebunny.com/*
// @include        http://www.exiern.com/*
// @include        http://nsfw-comix.com/*
// @include        http://jaynaylor.com/*
// @include        http://www.anelnoath.com/*
// @include        http://www.faans.com/*
// @include        http://www.truefork.org/*
// @include        http://truefork.org/*
// @include        http://www.aorange.com/*
// @include        http://www.strangecandy.net/*
// @include        http://www.thewotch.com/*
// @include        http://thewotch.com/*
// @include        http://www.cheercomic.com/*
// @include        http://cheercomic.com/*
// @include        http://www.sgvy.com/*
// @include        http://sgvy.com/*
// @include        http://www.drunkduck.com/*
// @include        http://drunkduck.com/*
// @include        http://www.ephralon.de/seekers_detailed.php*
// @include        http://ephralon.de/seekers_detailed.php*
// @include        http://www.terinu.com/*
// @include        http://terinu.com/*
// @include        http://dcisgoingtohell.com/*
// @include        http://las-historietas.blogspot.com/*
// @include        http://www.palcomix.com/*
// @include        http://palcomix.com/*
// @include        http://www.palcomix.org/*
// @include        http://palcomix.org/*
// @include        http://www.whiteninjacomics.com/*
// @include        http://whiteninjacomics.com/*
// @include        http://www.apenotmonkey.com/*
// @include        http://malandchad.com/*
// @include        http://www.goodmanga.net/*
// @include        http://www.digitalcomicmuseum.com/*
// @include        http://digitalcomicmuseum.com/*
// @include        http://goldenagecomics.co.uk/*
// @include        http://fourcolorshadows.blogspot.com/*
// @include        http://thehorrorsofitall.blogspot.com/*
// @include        http://www.batoto.net/*
// @include        http://www.eegra.com/*
// @include        http://www.octopuspie.com/*
// @include        http://www.lovemenicecomic.com/*
// @include        http://www.manga-access.com/*
// @include        http://manga-access.com/*
// @include        http://www.ju-ni.net/*
// @include        http://ju-ni.net/*
// @include        http://blog.saveapathea.com/*
// @include        http://www.dead-philosophers.com/*
// @include        http://www.nerd-theater.com/*
// @include        http://nerd-theater.com/*
// @include        http://lackadaisy.foxprints.com/comic.php*
// @include        http://www.mangastream.to/*
// @include        http://www.kingfeatures.com/*
// @include        http://kingfeatures.com/*
// @include        http://www.thezombiehunters.com/*
// @include        http://thezombiehunters.com/*
// @include        http://www.bugcomic.com/*
// @include        http://www.interrobangstudios.com/*
// @include        http://interrobangstudios.com/*
// @include        http://www.hlcomic.com/*
// @include        http://hlcomic.com/*
// @include        http://syacartoonist.com/*
// @include        http://satwcomic.com/*
// @include        http://stupidfox.net/*
// @include        http://www.casualvillain.com/*
// @include        http://fanboys-online.com/*
// @include        http://www.girlswithslingshots.com/*
// @include        http://www.mntgaiden.com/*
// @include        http://truyen.vnsharing.net/*
// @include        http://lovehentaimanga.com/*
// @include        http://ravensdojo.com/*
// @include        http://freefall.purrsia.com/*
// @include        http://www.mangachapter.net/*
// @include        http://www.shd-wk.com/*
// @include        http://shd-wk.com/*
// @include        http://www.pepsaga.com/*
// @include        http://slimythief.com/*
// @include        http://www.pebbleversion.com/*
// @include        http://pebbleversion.com/*
// @include        http://mentalcatproductions.com/*
// @include        http://schoolbites.net/*
// @include        http://www.accurseddragon.com/*
// @include        http://www.krakowstudios.com/*
// @include        http://www.stringtheorycomic.com/*
// @include        http://www.supercrash.net/*
// @include        http://loveandcapes.com/*
// @include        http://victorycomic.comicgenesis.com/*
// @include        http://magellanverse.com/*
// @include        http://www.evil-comic.com/*
// @include        http://flakypastry.runningwithpencils.com/*
// @include        http://www.pointguardian.com/*
// @include        http://gogetaroomie.chloe-art.com/*
// @include        http://legendofbill.com/*
// @include        http://www.springiette.net/*
// @include        http://springiette.net/*
// @include        http://www.vampirecheerleaders.net/*
// @include        http://www.paranormalmysterysquad.com/*
// @include        http://www.draculaeverlasting.com/*
// @include        http://www.amazingagentjennifer.com/*
// @include        http://mindmistress.comicgenesis.com/*
// @include        http://www.evernightcomic.com/*
// @include        http://www.xindm.cn/*
// @include        http://mh2.xindm.cn/*
// @include        http://www.manga123.com/read/*
// @include        http://manga.redhawkscans.com/*
// @include        http://www.mudascantrad.com/*
// @include        http://slide.extrascans.net/*
// @include        http://*.thewebcomic.com/*
// @include        http://www.mangapark.com/*
// @include        http://www.manga-go.com/*
// @include        http://www.comicstriplibrary.org/display/*
// @include        http://comicstriplibrary.org/display/*
// @include        http://www.wirepop.com/*
// @include        http://wirepop.com/*
// @include        http://www.fantasyrealmsonline.com/manga/*
// @include        http://foolrulez.org/*
// @include        http://reader.japanzai.com/*
// @include        http://www.psychopandas.com/reader/*
// @include        http://psychopandas.com/reader/*
// @include        http://www.ourmanga.com/*
// @include        http://readonline.egscans.org/*
// @include        http://read.egscans.org/*
// @include        http://reader.eternalmanga.net/*
// @include        http://gallery.ryuutama.com/*
// @include        http://*.tiraecol.net/*
// @include        http://tiraecol.net/*
// @include        http://www.conejofrustrado.com/*
// @include        http://www.e2w-illustration.com/*
// @include        http://2gamerz.com/*
// @include        http://reader.fth-scans.com/*
// @include        http://www.simple-scans.com/*
// @include        http://simple-scans.com/*
// @include        http://www.mymangaspot.com/*
// @include        http://comic.naver.com/*
// @include        http://www.peteristhewolf.com/*
// @include        http://peteristhewolf.com/*
// @include        http://www.wlpcomics.com/*
// @include        http://wlpcomics.com/*
// @include        http://www.mangatraders.com/*
// @include        http://hentaifromhell.net/*
// @include        http://trenchescomic.com/*
// @include        http://www.sakicow.com/reader/*
// @include        http://sakicow.com/reader/*
// @include        http://www.goominet.com/unspeakable-vault/*
// @include        http://www.doesnotplaywellwithothers.com/*
// @include        http://krakowstudios.com/*
// @include        http://www.aikoniacomic.com/*
// @include        http://aikoniacomic.com/*
// @include        http://www.grrlpowercomic.com/*
// @include        http://www.poisonedminds.com/*
// @include        http://poisonedminds.com/*
// @include        http://nodwick.humor.gamespy.com/*
// @include        http://www.the-whiteboard.com/*
// @include        http://the-whiteboard.com/*
// @include        http://www.mezzacotta.net/*
// @include        http://www.hbrowse.com/*
// @include        http://www.vexxarr.com/*
// @include        http://vexxarr.com/*
// @include        http://aptitude.surfacingpoint.com/*
// @include        http://www.bardsworth.com/*
// @include        http://fancyadventures.com/*
// @include        http://www.chron.com/entertainment/comics-games/comic/*
// @include        http://www.purplepussy.net/*
// @include        http://purplepussy.net/*
// @include        http://www.heroeslocales.com/bunsen/*
// @include        http://www.readhentaionline.com/*
// @include        http://readhentaionline.com/*
// @include        http://www.darklegacycomics.com/*
// @include        http://darklegacycomics.com/*
// @include        http://candicomics.com/*
// @include        http://www.buckocomic.com/*
// @include        http://bearmageddon.com/*
// @include        http://betweenfailures.net/*
// @include        http://www.sisterclaire.com/*
// @include        http://www.fayerwayer.com/*
// @include        http://www.niubie.com/*
// @include        http://www.awesomehospital.com/*
// @include        http://ars.userfriendly.org/cartoons/*
// @include        http://www.friendswithboys.com/*
// @include        http://www.mangago.com/*
// @include        http://www.jesusandmo.net/*
// @include        http://www.calamitiesofnature.com/*
// @include        http://www.rosalarian.com/*
// @include        http://rosalarian.com/*
// @include        http://dungeond.com/*
// @include        http://www.irregularwebcomic.net/*
// @include        http://adistantsoil.com/*
// @include        http://comic.nodwick.com/*
// @include        http://ffn.nodwick.com/*
// @include        http://ps238.nodwick.com/*
// @include        http://kronos.mcanime.net/*
// @include        http://www.ghastlycomic.com/*
// @include        http://thedevilspanties.com/*
// @include        http://walkingdeadbr.com/*displayimage.php*
// @include        http://www.mangapanda.com/*
// @include        http://mangable.com/*
// @include        http://dragonflyscans.org/*
// @include        http://readincesthentai.com/*
// @include        http://www.animephile.com/*
// @include        http://hentaistreamer.com/*
// @include        http://kissmanga.com/*
// @include        http://www.readmangahentai.com/*
// @include        http://readmangahentai.com/*
// @include        http://www.masterbloodfer.org/*
// @include        http://masterbloodfer.org/*
// @include        http://www.mangatank.com/*
// @include        http://www.snowflakescomic.com/*
// @include        http://mangafox.mobi/*
// @include        http://www.mangainn.com/*
// @include        http://invisiblebread.com/*
// @include        http://www.shiftylook.com/comics/*
// @include        http://onlinereader.mangapirate.net/*
// @include        http://www.8comic.com/love/*
// @include        http://8comic.com/love/*
// @include        http://www.mangahead.com/*
// @include        http://mangahead.com/*
// @include        http://www.vickifox.com/*
// @include        http://www.spinnyverse.com/*
// @include        http://zenpencils.com/*
// @include        http://wootmanga.com/*
// @include        http://hentai2read.com/*
// @include        http://m.hentai2read.com/*
// @include        http://komikmy.com/*/*/*
// @include        http://www.hentaifr.net/doujinshisheng.php*
// @include        http://www.sientoymiento.cl/*
// @include        http://www.commissionedcomic.com/*
// @include        http://www.mangasky.com/*
// @include        http://mangapirate.net/*
// @include        http://nomanga.com/*
// @include        http://www.pipi.cl/*
// @include        http://hentaimangaonline.com/*
// @include        http://webcomics.yaoi911.com/*
// @include        http://www.whompcomic.com/*
// @include        http://actiontimebuddies.com/*
// @include        http://www.superbrophybrothers.com/*
// @include        http://www.surasplace.com/*
// @include        http://surasplace.com/*
// @include        http://mangacow.me/*
// @include        http://fallensyndicate.com/reader/*
// @include        http://www.nekothekitty.net/*
// @include        http://curtailedcomic.com/*
// @include        http://www.wiemanga.com/*
// @include        http://img.wiemanga.com/*
// @include        http://hentai4manga.com/*
// @include        http://bradcolbow.com/*
// @include        http://www.gaomanga.com/*
// @include        http://www.theherobiz.com/*
// @include        http://guildedage.net/comic/*
// @include        http://betweenfailures.com/*
// @include        http://www.claudeandmonet.com/*
// @include        http://phobia.subcultura.es/tira/*
// @include        http://www.manga-tu.be/*
// @include        http://de.ninemanga.com/*
// @include        http://proxer.me/*
// @include        http://www.demanga.com/*
// @include        http://www.meinmanga.com/*
// @include        http://www.senmanga.com/*
// @include        http://raw.senmanga.com/*
// @include        http://www.mangaesta.net/*
// @include        http://www.mabuns.web.id/*
// @include        http://www.manga4indo.com/*
// @include        http://www.bloomingfaeries.com/*
// @include        http://www.friendshipscans.com/*
// @include        http://neechan.net/*
// @include        http://www.komikid.com/*
// @include        http://komikid.com/*
// @include        http://blog.komikid.com/*
// @include        http://www.findchaos.com/*
// @include        http://chaoslife.findchaos.com/*
// @include        http://moonoverjune.com/*
// @include        http://www.shadbase.com/*
// @include        http://www.shagbase.com/*
// @include        http://www.mrlovenstein.com/*
// @include        http://www.anticscomic.com/*
// @include        http://octopuns.blogspot.com/*
// @include        http://www.onemanga.me/*
// @include        http://mngacow.com/*
// @include        http://www.mangabee.com/*
// @include        http://www.ver-manga.net/*
// @include        http://mangadoom.com/*
// @include        http://www.powernapcomic.com/*
// @include        http://www.ismanga.com/*
// @include        http://www.mangabird.com/*
// @include        http://mangachrome.com/*
// @include        http://www.7manga.com/*
// @include        http://7manga.com/*
// @include        http://www.mangadevil.com/*
// @include        http://mangadevil.com/*
// @include        http://www.mangamofo.com/*
// ==/UserScript==

var dataCache = null; //cache para no leer del disco y parsear la configuracion en cada getData
var firstRun = false;

//por si funcionan las GM_* pero falla preguntar sin el "this.", o si tiran una excepcion al preguntar
try{ GM_getValue = GM_getValue || this.GM_getValue; }catch(e){ GM_getValue = false; }
try{ GM_setValue = GM_setValue || this.GM_setValue; }catch(e){ GM_setValue = false; }
try{ GM_deleteValue = GM_deleteValue || this.GM_deleteValue; }catch(e){ GM_deleteValue = false; }
try{ GM_xmlhttpRequest = GM_xmlhttpRequest || this.GM_xmlhttpRequest; }catch(e){ GM_xmlhttpRequest = false; }
try{ GM_registerMenuCommand = GM_registerMenuCommand || this.GM_registerMenuCommand; }catch(e){ GM_registerMenuCommand = false; }
try{ GM_openInTab = GM_openInTab || this.GM_openInTab; }catch(e){ GM_openInTab = false; }

try{
	//fix para usar data persistente sin pseudogreasemonkey
	if (!GM_getValue || GM_getValue.toString().indexOf("not supported")>-1) {
		GM_getValue=function (key,def) {
			if(!localStorage || !localStorage.hasOwnProperty(key)) return def;
			var val = localStorage[key];
			return val !== undefined ? val : def;
		};
		GM_setValue=function (key,value) {
			if(!localStorage) return null;
			return localStorage[key]=value;
		};
		GM_deleteValue=function (key) {
			if(localStorage) localStorage.removeItem(key);
		};
	}
	else{
		var gmsets = GM_getValue('wcr.settings', null);
		if(gmsets) dataCache = JSON.parse(gmsets);
		else{
			firstRun = true;
			GM_setValue('wcr.settings', '{}');
			dataCache = {};
		}
	}
	if(!GM_openInTab) GM_openInTab = window.open;
	if(!GM_registerMenuCommand || GM_registerMenuCommand.toString().indexOf("not supported")>-1){
		GM_registerMenuCommand = function(txt, fun){
			var boton = document.createElement('button');
			boton.innerHTML = txt;
			setEvt(boton, 'click', fun);
			document.body.appendChild(boton);
		}
	}
}catch(e){}

var prefetchSize = confPrefetchSize([defaultSettings.prefetchBack, defaultSettings.prefetchNext]); //number of prefetched pages ahead in each direction
var prefetchSizeStart = confPrefetchSizeStart([defaultSettings.prefetchBackStart, defaultSettings.prefetchNextStart]); //number of prefetched pages in each direction the first time
var prefetchNoNext = confBool('prefetchNoNext', true);

var keepLayout = confKeepLayout(defaultSettings.fullLayout); //decide to keep the original layout of the page (true) or use a clean minimalistic layout (false)
var debug = confDebug(defaultSettings.debugMode); //alerts on errors, and shows some of the currently cache'd pages/images with the "," key
var showButtons = confShowButtons(defaultSettings.showButtons); //show or hide the buttons (back/next, bookmarks, settings, etc...)

var leftImageClick = confLeftImageClick(defaultSettings.clikLeftHalfGoesBack); //specifies if clicking the left half of the image will take you to the previous page

var goToBookmark = confBool('goToBookmark', defaultSettings.goToBookmark);
var useHistoryAPI = confBool('useHistoryAPI', true);
var moveWhileLoading = confBool('moveWhileLoading', defaultSettings.moveWhileLoading);

var maximgs = []; //mantener solo este num de imagenes cargadas atras y adelante de la actual para no comer memoria
maximgs[1] = Math.max(23, prefetchSize[1]);
maximgs[-1] = Math.max(23, prefetchSize[0]);

var usarb64 = confBool('b64_images', false);

/* paginas[i] = {
		url:
			//'substring' or /regexp/ that matches the url
		img:
			//gets the <img> element containing the desired image (not just the src, but the whole <img>)
			//if not present, searches an img with a src containing some common strings like "/comics/" or "/strips/"
			//'string' means "the <img> element whose src starts with 'string'"
		back:
		next:
			//get the href of the back and next links
			//if not present, defaults to links containing "back"|"prev" / "next" in the <a> element's innerHTML
			//'string' means "the href of the <a> element that satisfies 'string' (as an xpath expression)
		extra:
			//optional array of additional content, as a 'literal string' or taken from the html by either ['xpath'] or [/regexp/, group number]
		bgcol:
		txtcol:
			//override the default colors of the page for readability or aesthetics
			//'#RRGGBB', '#RGB', 'rgb(r, g, b)'
		js:
			//executes a custom function after a page change, receiving the direction (1=forward, -1=back, 0 the first time) as a parameter
		scrollx:
		scrolly:
			//tells the top-left coordinates for scrolling after changing page (default = U/L)
			//'U', 'D', 'L', 'R' and 'M' are to show the top, bottom, left, right and middle of the image
			//or it can be a number (in pixels) or a function that returns a number
		layout:
			//forces the default behaviour for the layout (true=keep the original, false=clean it)
		xelem:
			//string with an xpath expression to get the element to be used as placeholder for the extra content
			//used only when keeping the original layout
	}

	img/back/next/extra[i] can be either:
		'string',
		['xpath expression that returns the first element found'],
		['xpath expression that returns an array of elements', 'string to put between each element', ?first_index, ?last_index],
		[/regular expression/, group number to get the desired content]
		function(html_of_requested_page, position_relative_to_the_starting_page){ return content; }
	a 'string' is interpreted as part of a default xpath expression for img/back/next, or a literal string for extra[i]
*/

var paginas = [

	{	url:	'penny-arcade.com',
		img:	[['.post.comic img']],
		extra:	[[['#pageTitle h2']]],
		fixurl:	function(url, img, link){
					if(link && document.location.href.indexOf('//www.')>0){
						return url.replace('//penny', '//www.penny');
					}
					return url;
				}
	},
	{	url:	'xkcd.',
		img:	['//div[@id="comic"]//img'],
		first:	'.="|<"',
		last:	'.=">|"',
		extra:	['<br/>', ['//div[@id="ctitle"]'], function(html, pos) {
					var href = xpath('//div[@id="comic"]//a/@href', html);
					return '<br/><a href=' + href + '>' +
						(href.indexOf('xkcd') >= 0 ? 'Large version' : 'Bonus Link!') +
						'</a>';
				}, function(html, pos) {
					var comic = xpath('//div[@id="comic"]', html);
					var img = comic.getElementsByTagName('img')[0];
					img.parentNode.removeChild(img);
					return comic;
				}],
		bgcol:	'#fff'
	},
	{	url:	'*.dilbert.com',
		img:	[['.STR_Image img, .LGT_Date ~ img']],
		back:	[['.STR_Prev, .LGT_Date a:nth-of-type(1)']],
		next:	[['.STR_Next, .LGT_Date a:nth-of-type(2)']],
		fixurl:	function(url, img, link){
					if (img && (!keepLayout || document.location.href.indexOf('/fast/') > 0)) {
						url = url.replace(/\.(sunday|print)\.gif/, '.gif').replace('.gif', '.zoom.gif');
					}
					return url;
				}
	},
	{	url:	'explosm.net/comics',
		img:	[['div>img[src*="db/files"]']],
		back:	'.="< Previous"',
		next:	'.="Next >"',
		extra:	[['//a[contains(@href,"/author/")]/../..'], ' - ', [/<img alt[^>]+explosm\.net\/db\/files\/.*?([^\"\/]+)\.\w+\"/i, 1]],
		bgcol:	'#fff',
		txtcol:	'#000'
	},
	{	url:	'pvponline.com',
		img:	[['.post img']],
		extra:	[[['#headingArchive']]]
	},
	{	url:	'brawlinthefamily.keenspot.com',
		extra:	[['//div[@class="post-comic"]']],
		xelem:	'//div[@class="post-comic"]'
	},
	{	url:	'vgcats.com',
		img:	'images/'
	},
	{	url:	'phdcomics.com/comics',
		img:	'http://www.phdcomics.com/comics/archive/',
		extra:	[['//title/text()'], ' - ', ['//td/font/i/b/text()'], ['//img[contains(@src, "/comics/archive/")]/following-sibling::table']]
	},
	{	url:	'smbc-comics.com',
		img:	[['#comicimage img']],
		back:	[['.backRollover[href]']],
		next:	[['.nextRollover[href]']],
		extra:	[['//div[@id="aftercomic"]/img[contains(@src,"/")]']],
		style:	'div{float:none;}',
		js:		function(dir){
					if(!dir){
						exec('document.removeEventListener("keyup", onKeyUp, false)');
						setEvt(document, 'keyup', function(evt){
							exec('checkCodes('+evt.keyCode+')');
							if([88, 191, 82].indexOf(evt.keyCode) >= 0) exec('jumpToRandom()');
						});
					}
				}
	},
	{	url:	'abstrusegoose.com',
		img:	'http://abstrusegoose.com/strips/',
		extra:	['<br/>[', ['//h3/*/text()'], ']<br/><br/>', [/"storycontent"[\s\S]+?<img [\s\S]+?>([\s\S]+?)<\/div>/i, 1]]
	},
	{	url:	'thedoghousediaries.com',
		img:	'http://thedoghousediaries.com/comics/',
		back:	'@class="previous-comic-link"',
		next:	'@class="next-comic-link"',
		extra:	[['//div[@class="interior"]/div[contains(@id, "post-")]']],
		bgcol:	'#fff'
	},
	{	url:	/erfworld\.com\/(page\/|$)/,
		img:	['//div[@class="entry"]//img'],
		back:	'contains(.,"Older")',
		next:	'contains(.,"Newer")',
		extra:	[['//div[@class="post"]/*', '', 0, 2], ['//div[@class="post"][1]//div[@class="entry"]/p[not(.//img)]', ''], '</div>']
	},
	{	url:	'erfworld.com',
		extra:	[[['.post>h2']], ['//table[@class="PxgGalleryTable"]//p[not(img)]', '']]
	},
	{	url:	'es.juanelo.net/archivo',
		img:	'http://es.juanelo.net/tiras/',
		back:	'.="« Anterior"',
		next:	'.="Siguiente »"',
		style:	'#page{width:1210px;} .narrowcolumn{width:810px;}'
	},
	{	url:	'es.juanelo.net/show',
		img:	['//div[@id="tirashow"]//img[starts-with(@src, "http://es.juanelo.net/tiras/")]'],
		back:	['//div[@id="tirashow"]//a[.="« Anterior"]/@href'],
		next:	['//div[@id="tirashow"]//a[.="Siguiente »"]/@href'],
		style:	'#page{width:1210px;} .narrowcolumn{width:810px;}'
	},
	{	url:	'es.juanelo.net/20',
		img:	'http://es.juanelo.net/tiras/',
		back:	'contains(.,"«")',
		next:	'contains(.,"»")',
		extra:	[[['img[src*="/tiras/"]', '<br/>', 1]], [['.post>h2']], [['.entry>p']]],
		style:	'#page{width:1210px;} .narrowcolumn{width:810px;}',
		bgcol:	'#334255'
	},
	{	url:	'mangastream.com|readms.com',
		img:	[['#manga-page']],
		back:	[['.previous a']],
		next:	[['.next a']],
		style:	'.subnav[style*="fixed"]{display: none;}#wcr_imagen{max-width:none;}#reader-sky{z-index:-1;}',
		scrollx:'R',
		layout:	true
	},
	{	url:	'terrorisland.net',
		extra:	[['//div[@class="commentary"]', '']]
	},
	{	url:	'drmcninja.com',
		img:	'http://drmcninja.com/comics/',
		extra:	['<br/>', ['//select[@id="series_select"]'], ['//select[@id="page_select"]'], [['.post-comic .entry']]],
		js:		function(dir){
					var selSer = xpath('//div[@id="wcr_div"]//*[@id="series_select"]');
					setEvt(selSer, 'change', function(){
						exec("document.location.href = '/archives/comic/'+series_arr["+selSer.selectedIndex+"].posts[0];");
					});
					selSer.style.visibility = 'visible';
					selSer.disabled = false;

					var selPag = xpath('//div[@id="wcr_div"]//*[@id="page_select"]');
					setEvt(selPag, 'change', function(){
						document.location.href = '/archives/comic/'+selPag.value;
					});
				}
	},
	{	url:	'manga.animea.net',
		img:	['//img[@class="mangaimg"]'],
		back:	function(html, pos){
					var page = parseInt(html.match(/var page = (\d+);/)[1]);
					var pages = parseInt(html.match(/var pages=(\d+);/)[1]);
					var chapter = html.match(/var chapter="(.+?)";/)[1];
					var manga = decodeURI(link[pos]).match(new RegExp('/([^/]+)'+chapter.replace(/[-[\]{}()+?.,\\^$#\s]/g, "\\$&")))[1];

					if(page > 1) return '/'+manga+chapter+'-page-'+(page-1)+'.html';
					var chap = xpath('//select[@id="chapterlistheader"]/option[@value="'+chapter+'"]/preceding-sibling::option[1]/@value');
					return '/'+manga+chap+'-page-end.html';
				},
		next:	function(html, pos){
					var page = parseInt(html.match(/var page = (\d+);/)[1]);
					var pages = parseInt(html.match(/var pages=(\d+);/)[1]);
					var chapter = html.match(/var chapter="(.+?)";/)[1];
					var manga = decodeURI(link[pos]).match(new RegExp('/([^/]+)'+chapter.replace(/[-[\]{}()+?.,\\^$#\s]/g, "\\$&")))[1];

					if(page < pages) return '/'+manga+chapter+'-page-'+(page+1)+'.html';
					var chap = xpath('//select[@id="chapterlistheader"]/option[@value="'+chapter+'"]/following-sibling::option[1]/@value');
					return '/'+manga+chap+'-page-1.html';
				},
		extra:	[[['#chapterlistheader']], [['[name="page"]']]],
		scrollx:'R',
		js:		function(dir){
					var selchap = selCss('#wcr_extra #chapterlistheader');
					if(dir){
						selchap.innerHTML = selCss('#chapterlistheader', '<div>'+extra[0]+'</div>').innerHTML;
					}
					selchap.value = link[posActual].match(/(-chapter-.+?)-/)[1];
				}
	},
	{	url:	'shamusyoung.com/twentysidedtale',
		img:	'http://shamusyoung.mu.nu/images/comic_',
		extra:	[['//div[@class="entry-text"]/*', '', 5, -4], ['//h2[@class="entry-title"]']]
	},
	{	url:	'gpf-comics.com',
		img:	'/comics/',
		back:	'./img[@alt="Previous Comic"]',
		next:	'./img[@alt="Next Comic"]'
	},
	{	url:	'daisyowl.com',
		img:	['//div[@align="center"]//img[starts-with(@src,"/comic_images/")]']
	},
	{	url:	'hyperdeathbabies.com',
		img:	'anomaly/'
	},
	{	url:	'kyo.cn',
		img:	function(html, pos){
					var index = parseInt(get("index").value) + pos;
					var chnum = parseInt(get("num").value);
					if(index > chnum) throw 'fin';

					var img_url = get("img_url").value;
					var pipeichar = parseInt(get("ppchar").value);
					var preurl = pos ? imagen[0] : get('mainpic').src;
					preurl = preurl.substr(0, preurl.indexOf('/', 8)+1);

					var ll = pipeichar - (index+'').length;
					var tmp = "";
					for(var i=0; i<ll; i++) tmp += "0";

					return preurl + img_url + tmp + index + ".jpg";
				},
		back:	function(html, pos){
					var index = parseInt(get("index").value) + pos - 1;
					var chnum = parseInt(get("num").value);
					if(index <= 0) throw '0';
					return '##'+index;
				},
		next:	function(html, pos){
					var index = parseInt(get("index").value) + pos + 1;
					var chnum = parseInt(get("num").value);
					if(index > chnum) throw 'fin';
					return '##'+index;
				},
		scrollx:'R'
	},
	{	url:	'mangatoshokan.com|doujintoshokan.com',
		img:	['//img[@id="readerPage"]'],
		back:	'.="« Last"',
		next:	'.="Next »"',
		extra:	['Chapter: ', ['//table[@class="reader"]//select', ' Page: ', 0, 2], '<br/><br/>', ['//form/select[@onchange]']],
		txtcol:	'#fff',
		scrollx:'R'
	},
	{	url:	'amultiverse.com',
		extra:	[['//div[@class="post-content"]']],
		js:		function(){ if(keepLayout) get('comic').style.height = get('wcr_div').offsetHeight + 'px'; },
		xelem:	'//div[@id="content"]//div[@class="post-content"]',
		style:	'#comic button{float:none;}'
	},
	{	url:	'wondermark.com',
		img:	'http://wondermark.com/c/',
		back:	'@rel="prev"',
		next:	'@rel="next"',
		txtcol:	'#fff'
	},
	{	url:	'amazingsuperpowers.com',
		img:	function(html, pos){
					try{ return selCss('#comic-1 img', html); }
					catch(e){
						if(selCss('#comic-1 #comic-short', html)) return selCss('img', html);
					}
				},
		extra:	[[['#comic-1 #comic-short']],
				function(html, pos){
					var href = selCss('#question a', html).href;
					var htmlHidden = syncRequest(href, pos);
					return contenido(htmlHidden, [['#comic > *', '']]);
				}, [['.post']]],
		layelem:'//div[@id="comic-1"]'
	},
	{	url:	'anymanga.com',
		img:	['//img[starts-with(@src, "/manga") and not(contains(@src, "/covers/"))]'],
		back:	[/var url_back = "([^\"]+)"/, 1],
		next:	[/var url_next = "([^\"]+)"/, 1],
		scrollx:'R'
	},
	{	url:	'mangafox.me',
		img:	['//img[@id="image"]'],
		back:	function(html, pos){
					var href = contenido(html, ['//a[contains(@class, "prev_page")]/@href'], pos);
					if(href.indexOf('javascript')<0){
						if(href.indexOf('/')<0) return link[pos].replace(/[^\/]*$/, href);
						return href;
					}
					return contenido(html, ['//span[contains(., "Previous Chapter")]/../a/@href'], pos).replace(/\d+\.html/, '999.html');
				},
		next:	function(html, pos){
					var current_page = parseInt(html.match(/var current_page=(\d+);/)[1]);
					var final_page_of_chapter = parseInt(html.match(/var total_pages=(\d+);/)[1]);
					if(current_page < final_page_of_chapter){
						//just load next page
						var href = contenido(html, ['//a[contains(@class, "next_page")]/@href'], pos);
						if(href.indexOf('/')<0) return link[pos].replace(/[^\/]*$/, href);
						return href;
					}
					return contenido(html, ['//span[contains(., "Next Chapter")]/../a/@href'], pos);
				},
		extra:	[function(html, pos){
					if(extra[0]) return extra[0].replace(/(<\/select>)[\s\S]*/i, '$1');
					return contenido(html, ['//select[@id="bottom_chapter_list"]'], pos);
				}, ' ', [['select.m']], '<select id="top_chapter_list" style="display:none"></select>',
				function(html, pos){
					var alt = xpath('//img[@id="image"]/@onerror', html).replace(/^.+?'|'$/g, '');
					return '<a id="alt_img" style="display:none" href="'+alt+'"/>';
				}],
		js:		function(dir){
					if(!dir){
						exec('(function unbindear(){'+
							'try{ $(function(){$(document).unbind();}); }'+
							'catch(e){ setTimeout(unbindear, 200); }'+
						'})();');
						(function rellenar(){
							if(get('bottom_chapter_list').innerHTML.trim()){
								extra[0] = get('wcr_extra').innerHTML;
								var opts = selCss('#wcr_extra #bottom_chapter_list').options;
								var div = document.createElement('div');
								for(var i=-1; extra[i]; i--);
								for(i++; extra[i]; i++){
									if(!i) continue;
									div.innerHTML = extra[i];
									var sel = selCss('#bottom_chapter_list', div);
									for(var j=0; j<opts.length; j++) sel.options[j] = opts[j].cloneNode(true);
									extra[i] = div.innerHTML;
								}
								try{
									var sel = selCss('#bottom_bar #bottom_chapter_list');
									for(var j=0; j<opts.length; j++) sel.options[j] = opts[j].cloneNode(true);
								}catch(e){}
							}
							else setTimeout(rellenar, 200);
						})();
					}
					var selcaps = selCss('#wcr_extra #bottom_chapter_list');
					var caps = selcaps.options;
					selcaps.style.cssFloat = '';
					for(var i=0; i<caps.length; i++)
						if(link[posActual].indexOf(caps[i].value+'/') >= 0)
							return selcaps.selectedIndex = i;
					return 0;
				},
		onerr:	function(url, img, num, pos){
					if(num) return null;
					return xpath('//a[@id="alt_img"]/@href', extra[pos]);
				},
		scrollx:'R'
	},
	{	url:	'sinfest.net',
		back:	'img[@alt="Previous"]',
		next:	'img[@alt="Next"]',
		fixurl:	function(url, img, link){
					return url.replace('http://sinfest', 'http://www.sinfest');
				}
	},
	{	url:	'crfh.net',
		img:	['//img[contains(@src, "/crfh")]']
	},
	{	url:	'nuklearpower.com',
		img:	['//img[contains(@src, "/comics/")]'],
		back:	'@rel="prev"',
		next:	'@rel="next"'
	},
	{	url:	'mangareader.net',
		img:	['//div[@id="imgholder"]//img'],
		style:	'#imgholder{width:auto !important;}',
		scrollx:'R'
	},
	{	url:	'stoptazmo.com',
		img:	'http://read.',
		back:	function(html, pos){
					var selmanga = contenido(html, ['//select[@name="series"]']);
					var selchap = contenido(html, ['//select[@name="chapter"]']);
					var selpage = contenido(html, ['//select[@name="pagesel1"]']);

					var manga = selmanga.value;
					var chap, page;
					if(selpage.selectedIndex > 0){
						chap = selchap.value;
						page = selpage[selpage.selectedIndex-1].value;
					}
					else if(selchap.selectedIndex > 0){
						chap = selchap[selchap.selectedIndex-1].value;
						page = 0;
					}
					else throw 'primera pag del primer cap';

					return [link[0],
						'chapter=' + chap + '&chapter_hid=' + chap +
						'&pagesel1=' + page + '&image_hid=' + page +
						'&manga_hid=' + manga + '&series=' + manga];
				},
		next:	function(html, pos){
					var selmanga = contenido(html, ['//select[@name="series"]']);
					var selchap = contenido(html, ['//select[@name="chapter"]']);
					var selpage = contenido(html, ['//select[@name="pagesel1"]']);

					var manga = selmanga.value;
					var chap, page;
					if(selpage.selectedIndex < selpage.length-1){
						chap = selchap.value;
						page = selpage[selpage.selectedIndex+1].value;
					}
					else if(selchap.selectedIndex < selchap.length-1){
						chap = selchap[selchap.selectedIndex+1].value;
						page = 0;
					}
					else throw 'ultima pag del ultimo cap';

					return [link[0],
						'chapter=' + chap + '&chapter_hid=' + chap +
						'&pagesel1=' + page + '&image_hid=' + page +
						'&manga_hid=' + manga + '&series=' + manga];
				},
		extra:	[['//form[@name="pageSelector1"]']],
		scrollx:'R',
		style:	'form img{display:none;} #wcr_imagen{display:inline;}'
	},
	{	url:	'questionablecontent.net/',
		extra:	[['//div[@id="news"]']],
		xelem:	'//div[@id="news"]'
	},
	{	url:	'arcamax.com/thefunnies',
		img:	'/newspics/'
	},
	{	url:	/nettserier.no\/./,
		img:	'/_striper/',
		back:	'starts-with(., "F") and contains(., "rre ")',
		next:	'starts-with(., "Neste ")'
	},
	{	url:	'disneycomics.free.fr',
		img:	['//div/img']
	},
	{	url:	'virtualshackles.com',
		img:	['//div[@id="comicbox"]/img']
	},
	{	url:	'qwantz.com',
		back:	[['[rel="prev"]']],
		next:	[['[rel="next"]']],
		extra:	['<br/>', [/<span class="rss-title">(.*?)<\/span>/, 1], '<br/><br/>',
					function(html, pos){
						return unescape(contenido(html, [/mailto:.+?subject=(.*?)\"/, 1]));
					}] //original: http://userscripts.org/scripts/show/51520
	},
	{	url:	'notinventedhe.re',
		img:	'h',
		style:	'button{display:inline;color:#000;float:none;} #comic-nav{margin:0;}'
	},
	{	url:	'unshelved.com',
		style:	'button{display:inline;color:#000;float:none;}'
	},
	{	url:	'eviscerati.org',
		img:	[['.field-name-field-comic-image img']],
		back:	[['.previous a']],
		next:	[['.next a']]
	},
	{	url:	'haven-reader.net',
		img:	[['#mangaPage img']],
		back:	function(html, pos){
					var series = selCss('[name=series]', html).value;
					var chapter = selCss('[name=chapter]', html).value;
					var page = xpath('//select[@name="page"]/option[@selected]/preceding-sibling::option[1]/@value', html);
					return '?mode=view&series='+series+'&chapter='+chapter+'&page='+(page != '0' ? page : '1&prev');
				},
		next:	function(html, pos){
					var series = selCss('[name=series]', html).value;
					var chapter = selCss('[name=chapter]', html).value;
					try{ var page = xpath('//select[@name="page"]/option[@selected]/following-sibling::option[1]/@value', html); }
					catch(e){ var page = selCss('[name=page] [selected]', html).value + '&next'; }
					return '?mode=view&series='+series+'&chapter='+chapter+'&page='+page;
				},
		extra:	['<form name="navigate">', [['.series_name']], [['.chapter_number']], [['.page']], '</form>'],
		js:		function(dir){
					if(!dir){
						var form = selCss('form[name=navigate][method]');
						form.parentNode.removeChild(form);
					}
				},
		scrollx:'R'
	},
	{	url:	'read.mangashare.com',
		img:	['//div[@id="page"]//img'],
		back:	[/value="prev" onclick="javascript:window.location='(.+?)';"/, 1],
		next:	[/value="next" onclick="javascript:window.location='(.+?)';"/, 1],
		extra:	[['//div[@class="controls"]//select', '']],
		xelem:	'//div[@class="controls"]',
		scrollx:'R'
	},
	{	url:	'manga2u.me|demanga.com',
		img:	['//img[@class="manga-page"]'],
		back:	[/wpm_nav_pvs\s*=\s*["'](.+?)['"];/, 1],
		next:	[/wpm_nav_nxt\s*=\s*["'](.+?)['"];/, 1],
		scrollx:'R'
	},
	{	url:	'buttersafe.com',
		extra:	[['//div[@class="post-comic"]']]
	},
	{	url:	'romanticallyapocalyptic.com',
		img:	[['.comicmid img']],
		back:	'span[@class="spritePrevious"]',
		next:	'span[@class="spriteNext"]',
		first:	'span[@class="spriteStart"]'
	},
	{	url:	'somethingpositive.net',
		img:	'arch/|/arch/|sp',
		txtcol:	'#888'
	},
	{	url:	'rhymes-with-witch.com',
		img:	'images/rww|images/lwr|images/rippy'
	},
	{	url:	'superstupor.com',
		img:	'sust|http://www.superstupor.com/sust',
		back:	'img[@src="last.gif"]',
		txtcol:	'#888'
	},
	{	url:	'misfile.com',
		img:	'overlay.php?pageCalled'
	},
	{	url:	'digitalunrestcomic.com',
		img:	'strips/'
	},
	{	url:	'sluggy.com',
		img:	'/images/comics/',
		back:	'.="Prev."',
		next:	'.="Next"',
		extra:	[['//img[starts-with(@src, "/images/comics/")]', '', 1], ['//div[@class="comic_popup"]']]
	},
	{	url:	'asofterworld.com',
		img:	'clean/',
		bgcol:	'#fff'
	},
	{	url:	'achewood.com',
		img:	'http://m.assetbar.com/achewood/'
	},
	{	url:	'act-i-vate.com',
		img:	'http://www.act-i-vate.com/uploads/005/'
	},
	{	url:	'biggercheese.com',
		img:	'comics/'
	},
	{	url:	'gwscomic.com',
		img:	'images/gws/',
		back:	'img[@src="images/gwsmenu/back_off.jpg"]'
	},
	{	url:	'fonflatter.de',
		img:	['//p/a/img[@title]'],
		next:	'..[@id="next"]',
		back:	'..[@id="prev"]'
	},
	{	url:	'ruthe.de',
		img:	['//img[@alt="Cartoon"]'],
		back:	'img[@id="back"]',
		next:	'img[@id="weiter"]'
	},
	{	url:	'daybydaycartoon.com',
		img:	['//div/p/img']
	},
	{	url:	'dieselsweeties.com',
		img:	'/hstrips/'
	},
	{	url:	'foxtrot.com',
		bgcol:	'#fff'
	},
	{	url:	'csectioncomics.com',
		img:	['//div[@class="post-body entry-content"]/p//img']
	},
	{	url:	'garfieldminusgarfield.net/post',
		img:	['//div[@class="photo"]//img']
	},
	{	url:	'gocomics.com',
		img:	function(html, pos){
					try{ return selCss('.strip[src*="width="]', html); }
					catch(e){ return selCss('.strip', html); }
				},
		back:	['//ul[@class="feature-nav"]//a[@class="prev"]/@href'],
		next:	['//ul[@class="feature-nav"]//a[@class="next"]/@href'],
		last:	[['.newest']],
		style:	'.feature_item, .feature, #content {width: auto !important;}',
		layelem:'//p[@class="feature_item"]//img',
		fixurl:	function(url, img, link){
					if (img && url.indexOf('width=') > 0) {
						url = url.replace(/width=[^&]*/, '');
					}
					return url;
				}
	},
	{	url:	'jeffzugale.com',
		extra:	[['//div[@id="newsbox"]']],
		xelem:	'//div[@id="newsbox"]'
	},
	{	url:	'threepanelsoul.com',
		extra:	[['//nobr', '<br/>']],
		bgcol:	'#fff'
	},
	{	url:	'oglaf.com',
		img:	[['#strip']],
		back:	'div[@id="pv" or @id="pvs"]',
		next:	'div[@id="nx"]',
		extra:	[['//div[@id="tt"]/img']],
		style:	'b>div{float:left;}',
		bgcol:	'#ccc'
	},
	{	url:	'kevinandkell.com',
		back:	'..[@id="prevstrip"]',
		next:	'..[@id="nextstrip"]',
		extra:	[['//div[@id="caption"]/span']]
	},
	{	url:	'kittyhawkcomic.com',
		img:	['//div[@id="comic"]/img']
	},
	{	url:	'mycardboardlife.com',
		img:	'http://mycardboardlife.com/comics/',
		extra:	[['//div[@class="entry"]']]
	},
	{	url:	'megatokyo.',
		back:	[['.prev a']],
		next:	[['.next a']],
		style:	'#wcr_div{margin-bottom:50px;}#wcr_div *{float:none; text-align:center;}'
	},
	{	url:	'ex2.unixmanga.net',
		img:	[/\'<IMG .*?SRC="(.+?)"/i, 1],
		back:	function(html, pos){
					if(html.indexOf('PREVIOUS PAGE') > 0) return match(html, /var prevlink = "(.+?)"/, 1);
					return match(html, /document\.write.+?href *= *"(.+?)".+PREVIOUS CHAPTER/, 1);
				},
		next:	[/var nextlink = "(.+?)"/, 1],
		scrollx:'R'
	},
	{	url:	'reader.imangascans.org',
		img:	function(html, pos){
					var page = parseInt(html.match(/else var page = parseInt\('(\d+)'\);/)[1]) - 1;
					var pages = JSON.parse(html.match(/var pages = (.+)(;|$)/m)[1]);
					return pages.pg_base + pages.pages[page];
				},
		back:	function(html, pos){
					var selpag = selCss('#page_select', html);
					var pars = selpag.getAttribute('onchange').match(/\('(.+)', '(.+)', .+\)/);
					if(selpag.selectedIndex){
						return "http://reader.imangascans.org/" +
							pars[1] + "/" + pars[2] + "/" + selpag.options[selpag.selectedIndex - 1].value;
					}
					var selchap = selCss('[name="chapter"]', html);
					if(selchap.selectedIndex){
						var chap = "http://reader.imangascans.org/" +
							pars[1] + "/" + selchap.options[selchap.selectedIndex - 1].value;
						var htmlPrev = syncRequest(chap, pos);
						return chap + "/" + xpath('//select[@id="page_select"]/option[last()]/@value', htmlPrev);
					}
					throw 'fail';
				},
		next:	function(html, pos){
					var selpag = selCss('#page_select', html);
					var pars = selpag.getAttribute('onchange').match(/\('(.+)', '(.+)', .+\)/);
					if(selpag.selectedIndex < selpag.options.length-1){
						return "http://reader.imangascans.org/" +
							pars[1] + "/" + pars[2] + "/" + selpag.options[selpag.selectedIndex + 1].value;
					}
					var selchap = selCss('[name="chapter"]', html);
					if(selchap.selectedIndex < selchap.options.length-1){
						return "http://reader.imangascans.org/" +
							pars[1] + "/" + selchap.options[selchap.selectedIndex + 1].value;
					}
					throw 'fail';
				},
		extra:	[['//div[@class="pager"]']],
		xelem:	'//div[@class="pager"]/..',
		layelem:'//div[@id="image_frame"]',
		scrollx:'R'
	},
	{	url:	'noreasoncomics.com',
		img:	['//div[@id="comic"]/img'],
		extra:	[['//div[@id="column"]']],
		xelem:	'//div[@id="column"]'
	},
	{	url:	'pixelcomic.net',
		img:	['//font/img'],
		extra:	[['//font/font', '']]
	},
	{	url:	'redmeat.com',
		img:	['//div[@id="weeklyStrip"]/img'],
		extra:	[['//div[@class="moreRedMeat"]', '', 1]]
	},
	{	url:	'sexylosers.com',
		back:	'.="<<" and font[@color="#ffaaaa"]',
		next:	'.=">>" and font[@color="#ffaaaa"]'
	},
	{	url:	'mangaeden.com|perveden.com',
		img:	['//img[@id="mainImg"]'],
		scrollx:'R'
	},
	{	url:	'pbfcomics.com',
		img:	'/archive',
		back:	'.="Older"',
		next:	'.="Newer"',
		extra:	[['//center/span/b[1]']]
	},
	{	url:	'tjandamal.com',
		img:	'http://tjandamal.com/comic/img/comic/',
		back:	'.="<"',
		next:	'.=">"'
	},
	{	url:	'sfeertheory.littlefoolery.com',
		img:	'art/'
	},
	{	url:	'wanderingones.com',
		img:	['//img[@alt="comic strip"]'],
		extra:	[['//img[@alt="comic strip"]', '<br/>', 1]]
	},
	{	url:	'big-big-truck.com/ayiw/*.html',
		img:	['//img'],
		extra:	[['//tr[2]//strong'], ['//td/p', '']]
	},
	{	url:	'wastedtalent.ca',
		img:	'http://www.wastedtalent.ca/sites/default/files/imagecache/comic_full/comics/'
	},
	{	url:	'wulffmorgenthaler.com',
		img:	'striphandler.ashx?stripid='
	},
	{	url:	'weregeek.com',
		img:	['//div[@id="comic"]/img']
	},
	{	url:	'*.katbox.net',
		img:	[['.webcomic-image img']]
	},
	{	url:	'gipcomic.com',
		img:	'/pages/',
		back:	'img[@alt="prev"]',
		next:	'img[@alt="next"]',
		scrollx:'R'
	},
	{	url:	'theoswaldchronicles.com',
		img:	'http://www.theoswaldchronicles.com/wp-content/webcomic/',
		back:	'@rel="previous"',
		next:	'@rel="next"'
	},
	{	url:	'awkwardzombie.com',
		img:	['//div[@id="comic"]/img'],
		back:	'img[@alt="Previous Comic"]',
		next:	'img[@alt="Next Comic"]',
		extra:	[['//div[@id="comic"]/img', '<br/>', 1], ['//div[@id="blarg"]']]
	},
	{	url:	'stainedglasssamurai.com',
		img:	['//div[@id="mainContent"]//img']
	},
	{	url:	'*.seraph-inn.com',
		img:	'pages/'
	},
	{	url:	'fakku.net',
		img:	function(html, pos){
					var thumbs = JSON.parse(match(html, /params\.thumbs\s*=\s*(.+);/, 1));
					var x = link[0].match(/page=(\d+)/);
					x = Number(x ? x[1] : 0)+pos;
					if(!x) return '.';
					if(x<0 || x>thumbs.length) throw 'fail';
					x = x.toString();
					while(x.length<3) x='0'+x;
					return html.match(/'([^']+\/images\/manga\/[^']+)'/)[1] + x + '.jpg'; 
				},
		back:	function(html, pos){
					var thumbs = JSON.parse(match(html, /params\.thumbs\s*=\s*(.+);/, 1));
					var x = link[0].match(/page=(\d+)/);
					x = Number(x ? x[1] : 0)+pos-1;
					if(x<0 || x>thumbs.length) throw 'fail';
					return link[0].replace(/#.+/, '')+'##page='+x;
				},
		next:	function(html, pos){
					var thumbs = JSON.parse(match(html, /params\.thumbs\s*=\s*(.+);/, 1));
					var x = link[0].match(/page=(\d+)/);
					x = Number(x ? x[1] : 0)+pos+1;
					if(x<0 || x>thumbs.length) throw 'fail';
					return link[0].replace(/#.+/, '')+'##page='+x;
				},
		js:		function(dir){
					if(!dir){
						exec(
							"$(function(){"+ //cambio los links de los thumbs
								"$('[href^=\"#page\"]').each(function(){"+
									"$(this).attr('href', document.location.href.replace(/#.+/, '')+'&'+$(this).attr('href'));"+
								"});"+ //arreglo el select
								"$('.drop').change(function(){"+
									"window.location.href = document.location.href.replace(/#.+/, '')+"+
										"($(this).val() != '0' ? '&#page=' + $(this).val() : '');"+
								"});"+ //saco el interval q molesta con el update_page
								"for(var i=setInterval(' ', 23232323); i; i--) clearInterval(i);"+
							"});"
						);
					}
					var x = link[0].match(/page=(\d+)/);
					x = Number(x ? x[1] : 0)+posActual;
					get('thumbs').style.display = x ? 'none' : '';
				},
		style:	'header{position:absolute;}',
		scrollx:'R',
		layelem:'//div[@id="image"]'
	},
	{	url:	'soulless-comic.com',
		img:	'http://www.soulless-comic.com?comic_object'
	},
	{	url:	'earthsongsaga.com',
		img:	'../images/vol',
		back:	function(html, pos){
					try{ return selCss('#previous a', html); }
					catch(e){ return xpath('//table[2]//td[2]//a/@href', html); }
				},
		next:	function(html, pos){
					try{ return selCss('#next a', html); }
					catch(e){ return xpath('//table[2]//td[3]//a/@href', html); }
				},
		extra:	[function(html, pos){
					return '<img src="'+xpath('//a[starts-with(@href, "../images/vol")]/@href', html)+'"/>';
				}],
		style:	'#wcr_div{background:#d1be8b;}'
	},
	{	url:	'goblinscomic.com',
		style:	'#comic{overflow:visible;}' //ugly but works...
	},
	{	url:	'precociouscomic.com',
		back:	'.="Previous"',
		next:	'.="Next"'
	},
	{	url:	'*.spiderforest.com',
		img:	['//img[contains(@src, "comics/")]']
	},
	{	url:	'sevensmith.net/chirault',
		img:	'images/'
	},
	{	url:	'junglestudio.com/roza',
		img:	'pages/',
		back:	'img[contains(@src, "navtable_09.gif")]',
		next:	'img[contains(@src, "navtable_11.gif")]'
	},
	{	url:	'dream-scar.net',
		img:	'files/'
	},
	{	url:	'tryinghuman.com',
		back:	'img[@alt="Previous comic"]',
		next:	'img[@alt="Next comic"]'
	},
	{	url:	'thedreamercomic.com',
		img:	'issues/'
	},
	{	url:	'sandraandwoo.com',
		img:	['//div[@id="comic"]/img']
	},
	{	url:	'freakangels.com',
		img:	'http://www.freakangels.com/comics/',
		back:	function(html, pos){
					var page = link[pos].match(/page=(\d+)/);
					if(page) page = page[1];
					if(!page || page==1) return xpath('//li[@class="left"]/a/@href', html);
					return link[pos].replace(/page=\d+/, 'page='+(page-1));
				},
		next:	function(html, pos){
					var page = link[pos].match(/page=(\d+)/);
					page = page ? Number(page[1]) : 1;
					try{ return xpath('//a[contains(@href, "page='+(page+1)+'")]/@href', html); }
					catch(e){ return xpath('//li[@class="right"]/a/@href', html); }
				}
	},
	{	url:	'comics.com',
		img:	['//a[@class="STR_StripImage"]/img'],
		back:	[/Link_Previous: '(.+?)'/, 1],
		next:	[/Link_Next: '(.+?)'/, 1]
	},
	{	url:	'sakanacomic.com',
		img:	'/img/com/',
		style:	'#comic-outer{height:auto;}'
	},
	{	url:	'jaygeefisher.com',
		img:	'Strips/',
		extra:	[['//img[starts-with(@src, "Strips/")]', '<br/>', 1]],
		style:	'#wcr_div div{position:relative;}'
	},
	{	url:	'doujin-moe.us',
		img:	['//img[@class="picture"]'],
		fixurl:	function(url, img, link){
					if(link && document.location.href.indexOf('&non_lr=1')>0)
						return url.replace('#top', '&non_lr=1');
					return url;
				}
	},
	{	url:	'keychain.patternspider.net',
		next:	'img[@alt="forward"]',
		extra:	[['//div[@class="style3"]']]
	},
	{	url:	'collectedcurios.com/sequentialart.php',
		img:	['//img[@id="strip"]'],
		back:	'img[@title="Back one"]',
		next:	'img[@title="Forward one"]'
	},
	{	url:	'doomies.com',
		img:	['//table[contains(@background, "/gotico.gif")]//img']
	},
	{	url:	'waywardsons.keenspot.com',
		img:	[['img[src*="/comics"]']],
		back:	'img[@id="p_bot_nav"]',
		next:	'img[@id="n_bot_nav"]'
	},
	{	url:	'marryme.keenspot.com|lastblood.keenspot.com',
		img:	['//div[@id="comic"]/img'],
		back:	'(preceding-sibling::small | preceding-sibling::*/small)[.="Previous Comic:"]',
		next:	'(preceding-sibling::small | preceding-sibling::*/small)[.="Next Comic:"]',
		fixurl:	function(url, img, link){
					if(img) return url.replace(/http:\/\/.+?\//, 'http://'+document.location.host+'/');
					return url;
				}
	},
	{	url:	'exposure.keenspot.com',
		img:	[['img[src*="/comics"]']],
		back:	'img[@id="exp46"]',
		next:	'img[@id="exp48"]'
	},
	{	url:	'yirmumah.keenspot.com',
		img:	[['img[src*="/comics"]']],
		back:	'.="Previous"',
		next:	'.="Next"'
	},
	{	url:	'twokinds.keenspot.com',
		img:	[['#cg_img img']],
		back:	'@id="cg_back"',
		next:	'@id="cg_next"'
	},
	{	url:	'roadwaffles.keenspot.com',
		img:	'comics/',
		back:	'.="previous"',
		next:	'.="next"'
	},
	{	url:	'plusev.keenspot.com',
		img:	[['img[src*="/comics"]']],
		back:	'img[@id="Previous_Day"]',
		next:	'img[@id="Next"]'
	},
	{	url:	'*.keenspot.com',
		img:	[['img[src*="/comics"]']],
		back:	'(img/@alt | .)="Previous comic"',
		next:	'(img/@alt | .)="Next comic"'
	},
	{	url:	'qgmindpolice.com',
		extra:	[['//div[@class="post"]']]
	},
	{	url:	'slowwave.com',
		img:	['//img[@alt="slow wave"]']
	},
	{	url:	'sylvanmigdal.com',
		img:	'/c/',
		back:	'img[starts-with(@alt,"Antecedent")]',
		next:	'img[starts-with(@alt,"Subsequent")]'
	},
	{	url:	'*.c.urvy.org',
		img:	'/c/',
		back:	'img[@alt="Previous page"]',
		next:	'img[@alt="Next page"]'
	},
	{	url:	'the-artiste.net',
		img:	'/img/com/',
		extra:	[['//div[@id="commentary"]']],
		js:		function(dir){
					get('commentary').style.display = '';
				}
	},
	{	url:	'survivingtheworld.net',
		img:	'Lesson|Recitation|GuestLecture',
		extra:	[['//span[@class="style7"]'], ['//p[@class="style21"]', '']]
	},
	{	url:	'view.thespectrum.net|animephile.com',
		img:	[['#mainimage']],
		back:	function(html, pos){
					var page, ch;
					try{ //pag ant, mismo cap
						page = xpath('//select[@name="page"]/option[@selected="selected"]/preceding-sibling::option[1]/@value', html);
						ch = xpath('//select[@name="ch"]/option[@selected="selected"]/@value', html);
					}
					catch(e){ //cap ant, ultima pag
						page = xpath('//input[@id="lastpage"]/@value', html);
						ch = xpath('//select[@name="ch"]/option[@selected="selected"]/preceding-sibling::option[1]/@value', html);
					}
					return '?ch='+ch+'&page='+page;
				},
		next:	function(html, pos){
					var page, ch;
					try{ //pag sgte, mismo cap
						page = xpath('//select[@name="page"]/option[@selected="selected"]/following-sibling::option[1]/@value', html);
						ch = xpath('//select[@name="ch"]/option[@selected="selected"]/@value', html);
					}
					catch(e){ //cap sgte, primera pag
						page = 1;
						ch = xpath('//select[@name="ch"]/option[@selected="selected"]/following-sibling::option[1]/@value', html);
					}
					return '?ch='+ch+'&page='+page;
				},
		extra:	[['//form']],
		js:		function(dir){
					if(!dir) exec("right_one = left_one = function(){};");
					var sels = xpath('//select', document, true);
					for(var i=0; i<sels.length; i++)
						setEvt(sels[i], 'change', function(evt){
							var frm = evt.target.parentNode.parentNode;
							if(evt.target.name=='ch') frm.childNodes[11].childNodes[1].value = '1';
							frm.submit();
						});
				},
		scrollx:'R',
		style:	'.imgContainer img {max-width:none;}'
	},
	{	url:	'mangavolume.com',
		extra:	[[['#chapters']], [['#pages']]],
		js:		function(dir){
					if(!dir) exec("back = next = '';");
				},
		scrollx:'R'
	},
	{	url:	'nonadventures.com',
		extra:	[['//div[@class="post"]']]
	},
	{	url:	'beardfluff.com',
		img:	'http://beardfluff.com/wp-content/webcomic/'
	},
	{	url:	'lawlscomic.com',
		img:	'http://lawlscomic.com/comics/',
		back:	'@class="navi navi-prev"',
		next:	'@class="navi navi-next"'
	},
	{	url:	'maakies.com',
		img:	['//a[@rel="attachment"]/img'],
		back:	'..[@class="nav-previous"]',
		next:	'..[@class="nav-next"]'
	},
	{	url:	'lefthandedtoons.com',
		img:	'http://www.lefthandedtoons.com/toons/'
	},
	{	url:	'trollscience.com',
		img:	'/image/',
		extra:	[['//h2'], ['//div[@id="troll-rate"]'], ['//div[@id="troll-comments"]']]
	},
	{	url:	'giantitp.com',
		back:	'img[@alt="Previous Comic"]',
		next:	'img[@alt="Next Comic"]'
	},
	{	url:	'submanga.com',
		img:	[['div > a > img']],
		back:	'img[@src="./s/hdl.gif"]',
		next:	'img[@src="./s/hdr.gif"]',
		extra:	[['//select']],
		style:	'#t{position:relative !important;} #wcr_div div{margin:0;}',
		scrollx:'R',
		onerr:	function(url, img, num){
					if(num >= 2) return null;
					var n = parseInt(img.match(/\/\/img(\d)/)[1]);
					n = ((n - 1) % 3) + 2; //2>3>4>2
					return {img: img.replace(/\/\/img\d/, '//img'+n) };
				}
	},
	{	url:	'g.e-hentai.org|exhentai.org',
		img:	[['#i3 a img, iframe + a img, .smi > a img']],
		back:	function(html, pos){
					var num = Number(link[pos].match(/-(\d+)(\?.+)?$/)[1]);
					var as = xpath('//a[img]', html, true);
					for(var i=0; i<as.length; i++)
						if(as[i].href.match(new RegExp('-'+(num-1)+'(\\?|$)')))
							return as[i].href;
					throw 'fail';
				},
		next:	function(html, pos){
					var num = Number(link[pos].match(/-(\d+)(\?.+)?$/)[1]);
					var as = xpath('//a[img]', html, true);
					for(var i=0; i<as.length; i++)
						if(as[i].href.match(new RegExp('-'+(num+1)+'(\\?|$)')))
							return as[i].href;
					throw 'fail';
				},
		extra:	[['//div[span]']],
		scrollx:'R',
		onerr:	function(url, img, num){
					if(num >= 2) return null;
					return {url: url + '?nl=' + (num+1) };
				}
	},
	{	url:	'animesquish.com',
		back:	function(html, pos){
					try{ return xpath('//a[.="Previous"]/@href', html); }
					catch(e){ return xpath('//a[@rel="prev"]/@href', html); }
				},
		next:	function(html, pos){
					try{ return xpath('//a[.="Next"]/@href', html); }
					catch(e){ return xpath('//a[@rel="next"]/@href', html); }
				},
		extra:	[['//a[@rel="bookmark"]/text()'], ['//select[@class="contentjumpddl"]']]
	},
	{	url:	'crazytje.be',
		img:	'http://img.crazytje.be/reader/',
		back:	'.="<< Back"',
		next:	'.="Next >>"',
		js:		function(dir){
					if(!dir) exec("goToPreviousPage = goToNextPage = '';");
				},
		extra:	[[['#chapter']], [['#pages']]],
		scrollx:'R'
	},
	{	url:	'tenmangas.com|tenmanga.com|*.wiemanga.com',
		img:	[['#comicpic']],
		back:	[/pre_page = "(.+?)"/, 1],
		next:	[/next_page = "(.+?)"/, 1],
		js:		function(dir){
					if(!dir) exec("document.onkeyup = '';");
				},
		extra:	[[['#chapter']], [['#page']]],
		scrollx:'R'
	},
	{	url:	'ekkifu.com',
		img:	'http://img',
		back:	[/value="previous page" onclick="javascript:window.location='(.+)';"/i, 1],
		next:	[/value="next page" onclick="javascript:window.location='(.+)';"/i, 1],
		extra:	[[['.chapter-navigation select', ' Page ']]],
		scrollx:'R'
	},
	{	url:	'bittersweetcandybowl.com',
		back:	'@class="previouspage"',
		next:	'@class="nextpage"',
		extra:	[[['#content>p:not([id])', '']], [['#comicselect']]]
	},
	{	url:	'imagebam.com',
		img:	['//img[@alt="loading"]']
	},
	{	url:	'otakuworks.com',
		img:	[['#filelist>a>img']],
		back:	function(html, pos){
					if(contenido(html, [/fmanga_hasprev = (\d+)/, 1]) == '1'){
						var prev = contenido(html, [/fmanga_prev = (\d+)/, 1]);
						return contenido(html, [/fmanga_link = "(.+?)"/, 1]).replace('{1}', prev);
					}
					return contenido(html, [/if\(fmanga_hasprev\).+\n.+'(.+?)'/, 1]);
				},
		next:	function(html, pos){
					if(contenido(html, [/fmanga_hasnext = (\d+)/, 1]) == '1'){
						var next = contenido(html, [/fmanga_next = (\d+)/, 1]);
						return contenido(html, [/fmanga_link = "(.+?)"/, 1]).replace('{1}', next);
					}
					return contenido(html, [/if\(fmanga_hasnext\).+\n.+'(.+?)'/, 1]);
				},
		scrollx:'R'
	},
	{	url:	'basicinstructions.net',
		img:	[['.full-image-block img']],
		back:	'@class="journal-entry-navigation-next"',
		next:	'@class="journal-entry-navigation-prev"'
	},
	{	url:	'insaneyetisquirrel.com',
		img:	[['.comic_content img']],
		extra:	[[['.comictitle']], '<br/>']
	},
	{	url:	'*.kukudm.*|*.socomic.*',
		img:	function(html, pos){
					if(!pos) return selCss('td>img');
					var src = match(imagen[0], /https?:\/\/[^\/]+\//, 0) +
						match(html, /write\(.+? src *= *'"\+[^+]+\+"(.+?)'/i, 1);
					return src;
				},
		back:	'img[@src="/images/t.gif"]',
		next:	'img[@src="/images/d.gif"]',
		scrollx:'R'
	},
	{	url:	'webcomicsnation.com',
		img:	['//tr[2]/td/div[2]/a/img'],
		back:	'.="Previous"',
		next:	'.="Next"',
		extra:	[['//tr[2]/td/div/a/img', '<br/>', 2]]
	},
	{	url:	'missmab.com',
		img:	['//center/img | //p/img'],
		extra:	[['//i']]
	},
	{	url:	'darthsanddroids.net',
		extra:	[[['.center b']], [['.text']]],
		style:	'.text{text-align:left;}'
	},
	{	url:	'harkavagrant.com',
		img:	[['.rss-content img']],
		extra:	[[['.black11']]]
	},
	{	url:	'walkinginsquares.com',
		extra:	[[['#enlight']]]
	},
	{	url:	'dresdencodak.com',
		img:	'http://dresdencodak.com/comics/',
		back:	'img[@src="http://dresdencodak.com/m_prev.png"]',
		next:	'img[@src="http://dresdencodak.com/m_next.png"]',
		extra:	[[['.post>h2']], [['.post p', '', 0, -1]]]
	},
	{	url:	'straysonline.com',
		img:	[['td[align="center"]>a>img']]
	},
	{	url:	/emi-art\.com\/twtyh\/(index\.html)?$/,
		img:	[['font[color="#000000"]>img']]
	},
	{	url:	'emi-art.com',
		img:	[['center>img']]
	},
	{	url:	'dragonball-multiverse.com',
		img:	[['#balloonsimg>img']],
		layout:	false
	},
	{	url:	'wayfarersmoon.com',
		img:	'/admin/uploads/wm',
		back:	'img[@alt="back button"]',
		next:	'img[@alt="forward button"]',
		first:	'img[@alt="begin button"]',
		last:	'img[@alt="end button"]'
	},
	{	url:	'*.smackjeeves.com',
		img:	[['#comic_image']]
	},
	{	url:	'10kcommotion.com',
		img:	function(html, pos){
					var num = Number(link[0].match(/\?(\d+)$/)[1])+pos;
					return match(html, new RegExp('image\\['+num+'\\]="(.+?)"'), 1);
				},
		back:	function(html, pos){
					var url = link[0].match(/^(.+\?)(\d+)$/);
					var num = Number(url[2])+pos-1;
					return num ? url[1]+num : null;
				},
		next:	function(html, pos){
					var url = link[0].match(/^(.+\?)(\d+)$/);
					var num = Number(url[2])+pos+1;
					return match(html, new RegExp('image\\['+num+'\\]="(.+?)"'), 1) ? url[1]+num : null;
				}
	},
	{	url:	'somemangas.com',
		img:	function(html, pos){
					if(!pos) selCss('option[value="traditional"][selected]', html);
					return selCss('center img', html);
				},
		back:	[/var prevpagelink = '(.+?)'/, 1],
		next:	[/var nextpagelink = '(.+?)'/, 1],
		scrollx:'R'
	},
	{	url:	'multiplexcomic.com',
		back:	'.="Previous"',
		next:	'.="Next"'
	},
	{	url:	'johnandjohn.nl',
		img:	'../write/',
		back:	'@id="pointleft"',
		next:	'@id="pointright"',
		extra:	[function(html, pos){
					var link = xpath('//a[img[@id="comicimg"]]/@href', html);
					return '<a href="'+link+'">'+link+'</a>';
				}],
		txtcol:	'orange',
		layout:	false
	},
	{	url:	'sorcery101.net',
		img:	[['.comic img']]
	},
	{	url:	'treadingground.com',
		extra:	[[['.entry']]]
	},
	{	url:	'jerkcity.com',
		img:	[['.aidsy']],
		extra:	[[['.slurping']]],
		style:	'#wcr_div a{color:#000;}',
		js:		function(dir){
					if(!dir) document.onkeyup = '';
				}
	},
	{	url:	'kiwiblitz.com|thepunchlineismachismo.com|zombieboycomics.com',
		img:	[['#comic-1 img']],
		extra:	[[['.entry']]],
		style:	'#wcr_div button{float:none;}'
	},
	{	url:	'kafkaskoffee.com',
		img:	[['.webcomic-object img']],
		extra:	[[['.webcomic_post h1']], [['.content']]]
	},
	{	url:	'out-at-home.com',
		extra:	[[['.comic']]],
		txtcol:	'#fff'
	},
	{	url:	'occasionalcomics.com|bearandtiger.com',
		extra:	[[['.entry']]]
	},
	{	url:	'babyblues.com',
		img:	[['.comic img']]
	},
	{	url:	'mangatopia.net',
		img:	'manga/',
		back:	['//input[@id="left"]/@value'],
		next:	['//input[@id="right"]/@value'],
		extra:	[[['.page_selector']]],
		scrollx:'R'
	},
	{	url:	'mankin-trad.net',
		img:	'read/',
		js:		function(dir){
					if(!dir){
						var hn = get('hoverNav');
						hn.parentNode.removeChild(hn);
					}
				},
		extra:	[[['.pagination']]],
		scrollx:'R'
	},
	{	url:	'*.mangahere.com',
		img:	[['#image']],
		back:	function(html, pos){
					var a = selCss('.prew_page', html);
					if(a.href.indexOf('javascript:')) return a;
					return xpath('//strong[.="Previous Chapter:" or .="Capítulo Anterior:"]/following-sibling::a/@href', html) + "last.html";
				},
		next:	function(html, pos){
					try{ return xpath('//select[@class="wid60"]/option[@selected]/following-sibling::option[1]/@value', html); }
					catch(e){ return xpath('//p[contains(., "es el siguiente...")]/a | //strong[.="Next Chapter:"]/following-sibling::a', html); }
				},
		js:		function(dir){
					if(!dir) exec("previous_page = next_page = '';");
					var selcap = selCss('#wcr_extra #top_chapter_list');
					var caps = selcap.options;
					for(var i=0; i<caps.length; i++){
						if(link[posActual].indexOf(caps[i].value) >= 0){
							selcap.selectedIndex = i;
							break;
						}
					}
				},
		extra:	[function(html, pos){
					return selCss('#top_chapter_list', pos ? document : html);
				}, [['.wid60']]],
		scrollx:'R'
	},
	{	url:	'spaceavalanche.com',
		img:	[['.entry img']]
	},
	{	url:	'schlockmercenary.com',
		img:	[['#comic img']],
		back:	'.="Previous Comic"',
		next:	'.="Next Comic"',
		extra:	[[['#comic img', '', 1]], [['div.footnote']]],
		style:	'#wcr_extra{width:780px; margin:0 auto;}'
	},
	{	url:	'warehousecomic.com',
		extra:	[[['.newsBox p', '']]]
	},
	{	url:	'nerfnow.com',
		extra:	[[['.comment']]]
	},
	{	url:	'zapcomic.com',
		img:	'http://www.zapcomic.com?comic_object='
	},
	{	url:	'shortpacked.com',
		img:	'http://www.shortpacked.com/comics/'
	},
	{	url:	'axecop.com',
		img:	[['#comic img']],
		back:	'.="Prev"',
		next:	'.="Next"',
		extra:	[[['.entry-content']]],
		txtcol:	'#fff'
	},
	{	url:	'somethingofthatilk.com',
		img:	'/comics/',
		back:	'@class="prev"',
		next:	'@class="next"',
		extra:	[[['#captioning']]]
	},
	{	url:	'imgur.com',
		img:	[['.image img']],
		extra:	[[['.left h2']]],
		style:	'#wcr_imagen{max-width:none;} .right-side{float:none !important;}'
	},
	{	url:	'reddit.com',
		img:	function(html, pos){
					var posts = selCss('#siteTable>.thing:not(.promoted)', html, true);
					var post = posts[((pos%25)+25)%25];
					var tit = selCss('a.title', post).href;
					if(tit.match(/\.(jpg|png|gif)(\?.+)?$/i)) return tit;
					else if(tit.match(/http:\/\/imgur\.com\/\w+$/i))
						return 'http://i.imgur.com/'+tit.match(/http:\/\/imgur\.com\/(\w+)$/i)[1]+'.jpg';
					else if(tit.match(/http:\/\/www\.quickmeme\.com\/meme\/\w+\/?$/i))
						return 'http://i.qkme.me/'+tit.match(/http:\/\/www\.quickmeme\.com\/meme\/(\w+)/i)[1]+'.jpg';
					else if(tit.match(/http:\/\/qkme\.me\//i))
						return 'http://c0016417.cdn2.cloudfiles.rackspacecloud.com/'+tit.match(/http:\/\/qkme\.me\/(\w+)/i)[1]+'.jpg';
					try{ return selCss('a.thumbnail img', post); }
					catch(e){}
					try{ return selCss('img#header-img', html); }
					catch(e){ return '/favicon.ico'; }
				},
		back:	function(html, pos){
					if(pos%25) return '##'+(pos-1);
					return selCss('a[rel~="prev"]', html);
				},
		next:	function(html, pos){
					if((pos+1)%25) return '##'+(pos+1);
					return selCss('a[rel~="next"]', html);
				},
		extra:	[function(html, pos){
					var posts = selCss('#siteTable>.thing:not(.promoted)', html, true);
					return posts[((pos%25)+25)%25];
				}],
		js:		function(dir){
					exec("expando_child($('.expando-button'))");
				},
		layelem:'//body/div[contains(@class,"content")]'
	},
	{	url:	'blankitcomics.com',
		img:	'http://blankitcomics.com/bicomics/'
	},
	{	url:	'anime-source.com',
		img:	'http://www.anime-source.com/html/images/',
		scrollx:'R'
	},
	{	url:	'mangarush.com',
		img:	'http://www.mangarush.com/files/mangas/',
		back:	function(html, pos){
					var path = match(html, /var path = '(.+)';/, 1);
					var manga = match(html, /var thisManga = '(.+)';/, 1);
					var chapter = match(html, /var thisChapter = '(.+)';/, 1);
					var page = Number(match(html, /var thisPage = (.+);/, 1));

					if(page > 1)
						return path + "manga/" + escape(manga) + "/" + escape(chapter) + "/p-" + (page-1);
					var prevChap = xpath('//select[@id="chapters_list"]/option[@selected]/preceding-sibling::option[1]/@value', html);
					return path + "manga/" + escape(manga) + "/" + escape(prevChap) + "/p-1";
				},
		next:	function(html, pos){
					var path = match(html, /var path = '(.+)';/, 1);
					var manga = match(html, /var thisManga = '(.+)';/, 1);
					var chapter = match(html, /var thisChapter = '(.+)';/, 1);
					var page = Number(match(html, /var thisPage = (.+);/, 1));
					var pages = Number(match(html, /var pages = (.+);/, 1));
					var nextChapter = match(html, /var nextChapter = '(.*)';/, 1);

					if(page < pages)
						return path + "manga/" + escape(manga) + "/" + escape(chapter) + "/p-" + (page+1);
					if(nextChapter != "")
						return path + "manga/" + escape(manga) + "/" + escape(nextChapter) + "/p-1";
					throw 'fin';
				},
		extra:	[[['.mangareader select', '']]],
		scrollx:'R'
	},
	{	url:	'citymanga.com',
		img:	'/files/images/',
		back:	[/id="previousbutton" onclick="javascript:window.location='(.+?)';"/, 1],
		next:	[/id="nextbutton" onclick="javascript:window.location='(.+?)';"/, 1],
		extra:	[[['#chapterselector']], [['#pageselector']]],
		scrollx:'R'
	},
	{	url:	'dctp.ws|dctpws.thetrogdor.com',
		img:	[['center>img']],
		back:	'img[@src="leftarrow.GIF"]',
		next:	'img[@src="rightarrow.GIF"]',
		scrollx:'R'
	},
	{	url:	'luscious.net',
		img:	[['#single_picture']],
		fixurl:	function(url, img, link){
					if(img) return url.replace(/(\.\d+x\d+)(\.\w+$)/, '$2');
					return url;
				},
		style:	'#wcr_div button{display:inline;}',
		scrollx:'R'
	},
 	{	url:	'old.lu.scio.us',
		img:	'http://static.lu.scio.us/hentai/',
 		fixurl:	function(url, img, link){
					if(img) return url.replace('normal__', '');
 					return url;
 				},
 		scrollx:'R'
 	},
	{	url:	'geekculture.com',
		img:	[['p > img']]
	},
	{	url:	'geeklifecomic.com',
		extra:	[[['.entry']]]
	},
	{	url:	'thedoujin.com',
		img:	'http://img',
		back:	[/<a href="#" onclick="document.location='([^']+?)'; return false;">Previous/, 1],
		next:	[/<a href="#" onclick="document.location='([^']+?)'; return false;">Next/, 1],
		scrollx:'R'
	},
	{	url:	'eatmanga.com',
		img:	[['#eatmanga_image, #eatmanga_image_big, #bigimage, .eatmanga_bigimage']],
		back:	function(html, pos){
					try{ return selCss('#page_previous:not([onclick])', html); }
					catch(e){
						return xpath('//select[@id="bottom_chapter_list"]/option[contains("'+link[pos]+'", @value)]/following-sibling::option[1]/@value',
							pos ? '<div>'+extra[0]+'</div>' : document);
					}
				},
		next:	function(html, pos){
					try{ return selCss('#page_next:not([onclick])', html); }
					catch(e){
						return xpath('//select[@id="bottom_chapter_list"]/option[contains("'+link[pos]+'", @value)]/preceding-sibling::option[1]/@value',
							pos ? '<div>'+extra[0]+'</div>' : document);
					}
				},
		extra:	[[['.navigation select', ' ', 2]]],
		js:		function(dir){
					var selchap = selCss('#wcr_extra #bottom_chapter_list');
					if(dir) selchap.innerHTML = selCss('#bottom_chapter_list', '<div>'+extra[0]+'</div>').innerHTML;
					selchap.value = xpath('//select[@id="bottom_chapter_list"]/option[contains("'+link[posActual]+'", @value)]/@value', selchap);
				},
		scrollx:'R'
	},
	{	url:	'oslevadosdabreca.com',
		img:	'http://www.oslevadosdabreca.com/tiras/',
		first:	[['.nav-first a']],
		last:	[['.nav-last a']]
	},
	{	url:	'faans.com',
		back:	'@rel="prev"',
		next:	'@rel="next"'
	},
	{	url:	'cheercomic.com',
		img:	'comics/',
		back:	'img[@id="navimg3"]',
		next:	'img[@id="navimg4"]'
	},
	{	url:	'drunkduck.com',
		img:	[['#comic img']],
		back:	'img[@class="arrow_prev"]',
		next:	'img[@class="arrow_next"]',
		first:	'img[@class="arrow_first"]',
		last:	'img[@class="arrow_last"]',
		extra:	[[['#author_note_holder']]],
		style:	'#wcr_extra #author_note_holder{float:none;text-align:left;min-height:0;} #wcr_extra .thumbnailleft img{width:60px;} #wcr_extra .postcontent{width:auto;}'
	},
	{	url:	'ephralon.de',
		img:	'/seekers/'
	},
	{	url:	'sgvy.com',
		img:	[['#comic']]
	},
	{	url:	'truefork.org',
		extra:	[[['.plaintext']]]
	},
	{	url:	/anelnoath\.com\/\w+\d+\.htm/,
		img:	[['img']]
	},
	{	url:	'nsfw-comix.com',
		img:	'comix/',
		extra:	[[['img[src^="comix/"]', '<br/>', 1]]]
	},
	{	url:	'thewotch.com',
		img:	'comics/',
		back:	'img[contains(@src,"nav_prevpage")]',
		next:	'img[contains(@src,"nav_nextpage")]',
		extra:	[[['.comments']]]
	},
	{	url:	'thedevilbear.com',
		img:	'comixx/'
	},
	{	url:	'terinu.com',
		img:	function(html, pos){
					if(!pos) return selCss('#Image1');

					var cappag = imagen[0].match(/Comic(\d+)Pg(\d+)/);
					var nombre = 'Chapter '+parseInt(cappag[1])+' Page '+parseInt(cappag[2]);
					var op = xpath('//option[.="'+nombre+'"]/'+
						(pos>0?'following':'preceding')+'-sibling::option['+Math.abs(pos)+']');

					var cappagimg = op.textContent.match(/Chapter (\d+) Page (\d+)/);
					var cap = cappagimg[1];
					while(cap.length<2) cap='0'+cap;
					var pag = cappagimg[2];
					while(pag.length<3) pag='0'+pag;

					return '/Comic/Comic'+cap+'Pg'+pag+'.jpg';
				},
		back:	function(html, pos){
					return '##'+(pos-1);
				},
		next:	function(html, pos){
					return '##'+(pos+1);
				}
	},
	{	url:	'las-historietas.blogspot.com',
		img:	['//div[contains(@class, "post-body")]//a[img and (contains(@href, ".png") or contains(@href, ".jpg") or contains(@href, ".gif"))]/@href'],
		back:	'@id="blog-pager-older-link"',
		next:	'@id="blog-pager-newer-link"',
		extra:	[function(html, pos){
					var div = selCss('.post-body', html);
					var aimgs = selCss('[href$=".png"]>img,[href$=".jpg"]>img,[href$=".gif"]>img,[href$=".PNG"]>img,[href$=".JPG"]>img,[href$=".GIF"]>img', div, true);
					aimgs[0].parentNode.removeChild(aimgs[0]);
					for(var i=1; i<aimgs.length; i++){
						var img = aimgs[i];
						var href = img.parentNode.href;
						if(img.src != href){
							img.src = href;
							img.removeAttribute('width');
							img.removeAttribute('height');
						}
					}
					return div;
				}],
		layelem:'//div[contains(@class, "post-body")]',
		style:	'.content-outer{max-width:none !important;}'
	},
	{	url:	'dcisgoingtohell.com',
		back:	'@class="navi navi-prev"',
		next:	'@class="navi navi-next"'
	},
	{	url:	'palcomix.com|palcomix.org',
		img:	'../images/',
		extra:	[[['form']]]
	},
	{	url:	'soulsymphonycomic.com',
		img:	[['#comic>img']]
	},
	{	url:	'whiteninjacomics.com',
		img:	[['[valign="top"]>[src^="/images/comics/"]']],
		back:	'img[@src="/images/previous.jpg"]',
		next:	'img[@src="/images/next.jpg"]',
		extra:	[[['[valign="bottom"]>[src^="/images/comics/"]']]]
	},
	{	url:	'apenotmonkey.com',
		back:	'@rel="prev"',
		next:	'@rel="next"'
	},
	{	url:	'malandchad.com',
		back:	'@rel="prev"',
		next:	'@rel="next"'
	},
	{	url:	'goodmanga.net',
		img:	[['#manga_viewer img']],
		back:	[['a.previous_page']],
		next:	[['a.next_page']],
		extra:	[[['#asset_1 select.chapter_select']], '<span>Page ', [['#asset_2 select.page_select']],
					' ', ['//select[@class="page_select"]/following-sibling::span'], '</span>'],
		xelem:	'//div[@id="manga_nav_top"]',
		style:	'#manga_nav_bottom{display:none}',
		scrollx:'R'
	},
	{	url:	'digitalcomicmuseum.com/preview',
		img:	'cache/'
	},
	{	url:	'goldenagecomics.co.uk',
		img:	function(html, pos){
					return get('img_'+pos).href;
				},
		back:	function(html, pos){
					if(!pos) throw 'fail';
					return '##'+(pos-1);
				},
		next:	function(html, pos){
					if(!get('img_'+(pos+1))) throw 'fail';
					return '##'+(pos+1);
				},
		layelem:'//div'
	},
	{	url:	'fourcolorshadows.blogspot.com|thehorrorsofitall.blogspot.com',
		img:	function(html, pos){
					var aimgs = xpath('//div[contains(@class,"blog-posts")]//div/a[img[not(@class="icon-action")]]', html, true);
					var num = pos ? Number(link[pos].match(/##(\d+);/)[1]) : 0;

					return aimgs[pos-num].href;
				},
		back:	function(html, pos){
					throw 'fail';
				},
		next:	function(html, pos){
					if(!pos) return '##0;1';

					var aimgs = xpath('//div[contains(@class,"blog-posts")]//div/a[img[not(@class="icon-action")]]', html, true);
					var num = Number(link[pos].match(/##(\d+);/)[1]);

					if(num+aimgs.length > pos+1) return '##' + num + ';' + (pos+1);

					return selCss('#Blog1_blog-pager-older-link', html).href +
						'##' + (num+aimgs.length) + ';' + (pos+1);
				},
		extra:	[function(html, pos){
					var post = xpath('//div[contains(@class,"post-body") and .//a[@href="'+imagen[pos]+'"]]', html);
					return outerHTML(selCss('h3', post.parentNode)) +
						'<br/>' + post.textContent +
						outerHTML(selCss('.post-footer', post.parentNode));
				}],
		layelem:'//div[@id="header-wrapper"]'
	},
	{	url:	'batoto.net',
		img:	[['#comic_page']],
		back:	function(html, pos){
					try{ return xpath('//a[img[@title="Previous Page"]]', html); }
					catch(e){ return xpath('//a[img[@title="Previous Chapter"]]', html); }
				},
		next:	function(html, pos){
					try{ return xpath('//a[img[@title="Next Page"]]', html); }
					catch(e){ return xpath('//a[img[@title="Next Chapter"]]', html); }
				},
		extra:	[['//img[@id="comic_page" and not(./ancestor::div[contains(@style, "display: none;")])]', '<br/>', 1],
					[['.moderation_bar']]],
		layelem:'//img[@id="comic_page"]',
		scrollx:'R'
	},
	{	url:	'nedroid.com',
		extra:	['<br/>', [['.post-comic h2']]]
	},
	{	url:	'lovemenicecomic.com',
		img:	'http://www.lovemenicecomic.com/wp-content/webcomic/',
		back:	'@rel="previous"',
		next:	'@rel="next"'
	},
	{	url:	'manga-access.com',
		img:	[['#pic img']],
		back:	function(html, pos){
					try{ return xpath('//select[@id="page_switch"]/option[@selected]/preceding-sibling::option[1]/@value', html); }
					catch(e){
						var chap = xpath('//select[@id="chapter_switch"]/option[@selected]/following-sibling::option[1]', html);
						return chap.value + '/' + chap.getAttribute('pages');
					}
				},
		next:	function(html, pos){
					try{ return xpath('//select[@id="page_switch"]/option[@selected]/following-sibling::option[1]/@value', html); }
					catch(e){ return xpath('//select[@id="chapter_switch"]/option[@selected]/preceding-sibling::option[1]/@value', html); }
				},
		js:		function(dir){
					if(!dir) exec("$('#pic img').unbind(); $(document).unbind();");
					setEvt(selCss('#wcr_div #chapter_switch, #wcr_div #page_switch', document, true), 'change', function(evt){ redirect(evt.target.value); });
				},
		extra:	['Chapter ', [['#chapter_switch']], ' / Page ', [['#page_switch']]],
		bgcol:	'#fff',
		scrollx:'R'
	},
	{	url:	'ju-ni.net',
		img:	function(html, pos){
					return xpath('//a[.=" +High res+ "]/@href', html).replace('?display=', '?displaypic=');
				},
		back:	'.="<- Previous"',
		next:	'.="Next ->"',
		extra:	[['//div[@id="picnav"]/text()', '']],
		layelem:'//img[@class="picture"]',
		scrollx:'R'
	},
	{	url:	'scarygoround.com',
		back:	'img[@alt="Previous"]',
		next:	'img[@alt="Next"]'
	},
	{	url:	'mangastream.to',
		back:	function(html, pos){
					var manga = html.match(/n_topic = "(.+?)";/)[1];
					try{
						var pag = xpath('//select[@id="id_page"]/option[@selected]/preceding-sibling::option[1]/@value', html);
						var chap = xpath('//select[@id="id_chapter"]/option[@selected]/@value', html);
						return  "/" + manga + "-chapter-" + chap + "-page-" + pag + ".html";
					}
					catch(e){
						chap = xpath('//select[@id="id_chapter"]/option[@selected]/preceding-sibling::option[1]/@value', html);
						return  "/" + manga + "-chapter-" + chap + ".html";
					}
				},
		next:	function(html, pos){
					var manga = html.match(/n_topic = "(.+?)";/)[1];
					try{
						var pag = xpath('//select[@id="id_page"]/option[@selected]/following-sibling::option[1]/@value', html);
						var chap = xpath('//select[@id="id_chapter"]/option[@selected]/@value', html);
						return  "/" + manga + "-chapter-" + chap + "-page-" + pag + ".html";
					}
					catch(e){
						chap = xpath('//select[@id="id_chapter"]/option[@selected]/following-sibling::option[1]/@value', html);
						return  "/" + manga + "-chapter-" + chap + ".html";
					}
				},
		extra:	[[['#change select', ' ']]],
		js:		function(dir){
					if(!dir) exec("$(document).unbind('keyup');");
				},
		scrollx:'R'
	},
	{	url:	'kingfeatures.com',
		img:	[['#comic img']],
		back:	function(html, pos){
					var date = xpath('//select[@name="date"]/option[@selected]/preceding-sibling::option[1]/@value', html);
					return 'aboutMaina.php?date='+date;
				},
		next:	function(html, pos){
					var date = xpath('//select[@name="date"]/option[@selected]/following-sibling::option[1]/@value', html);
					return 'aboutMaina.php?date='+date;
				}
	},
	{	url:	'thezombiehunters.com',
		extra:	[[['#ranttext']]]
	},
	{	url:	'syacartoonist.com|satwcomic.com|stupidfox.net',
		img:	[['[src*="/art/"]:not([class])']],
		extra:	[['//div[@class="stand_high"][1]']]
	},
	{	url:	'casualvillain.com',
		img:	[['#comic img']],
		back:	'.="Back"',
		next:	'.="Forward"'
	},
	{	url:	'fanboys-online.com',
		extra:	[[['.post-content']]],
		bgcol:	'#490606'
	},
	{	url:	'truyen.vnsharing.net',
		img:	function(html, pos){
					var pags = html.match(/lstImages.push\(".+"\);/g);
					var num = link[pos].match(/##(\d+)/);
					num = num ? parseInt(num[1]) : 0;
					return pags[num].match(/"(.+)"/)[1];
				},
		back:	function(html, pos){
					var num = link[pos].match(/##(\d+)/);
					num = num ? parseInt(num[1]) : 0;
					if(num) return link[pos].split('##')[0] + '##' + (num-1);

					var base = html.match(/\$\('#selectChapter'\).change[^\}]+'(.+)'/)[1];
					var chap = xpath('//select[@id="selectChapter"]/option[@selected]/preceding-sibling::option[1]/@value', html);
					return base + chap + '##0';
				},
		next:	function(html, pos){
					var pags = html.match(/lstImages.push\(".+"\);/g);
					var num = link[pos].match(/##(\d+)/);
					num = num ? parseInt(num[1]) : 0;
					if(num < pags.length-1) return link[pos].split('##')[0] + '##' + (num+1);

					var base = html.match(/\$\('#selectChapter'\).change[^\}]+'(.+)'/)[1];
					var chap = xpath('//select[@id="selectChapter"]/option[@selected]/following-sibling::option[1]/@value', html);
					return base + chap;
				},
		layelem:'//div[@id="divImage"]',
		scrollx:'R'
	},
	{	url:	'lovehentaimanga.com',
		img:	'mangas/',
		back:	'img[@title="Previous Page"]',
		next:	'img[@title="Next Page"]',
		extra:	[['//div[@class="pager"]']],
		xelem:	'//tr[last()]//div[@class="pager"]',
		scrollx:'R'
	},
	{	url:	'freefall.purrsia.com',
		img:	'/ff',
		back:	'contains(.,"Previous")',
		next:	'contains(.,"Next")'
	},
	{	url:	'mangachapter.net',
		img:	[['#mangaImg']],
		back:	function(html, pos){
					try{ return xpath('//a[.="Previous page"]', html); }
					catch(e){ return xpath('//span[.="Previous Chapter:"]/following-sibling::a[1]', html); }
				},
		next:	function(html, pos){
					try{ return xpath('//a[.="Next page"]', html); }
					catch(e){ return xpath('//span[.="Next Chapter:"]/following-sibling::a[1]', html); }
				},
		extra:	[[['#top_chapter_list']], [['.mangaread-bt .page-select select']]],
		scrollx:'R'
	},
	{	url:	'shd-wk.com',
		style:	'#wcr_div{text-align:left !important;} #wcr_listabm{padding-top:100px;}'
	},
	{	url:	'pebbleversion.com',
		img:	[['img[src*="ComicStrips"]']],
		extra:	[[['td[rowspan="2"] div']], [['td[colspan="4"] font']]]
	},
	{	url:	'accurseddragon.com',
		extra:	[[['.webcomic_post']]]
	},
	{	url:	'krakowstudios.com',
		back:	'.="Previous Comic"',
		next:	'.="Next Comic"'
	},
	{	url:	'victorycomic.comicgenesis.com',
		img:	[['img[alt="Comic"]']]
	},
	{	url:	'flakypastry.runningwithpencils.com',
		img:	'comics/'
	},
	{	url:	'gogetaroomie.chloe-art.com',
		img:	[['.comicpane img']]
	},
	{	url:	'springiette.net',
		back:	'img[contains(@alt,"previous")]',
		next:	'img[contains(@alt,"next")]'
	},
	{	url:	'mindmistress.comicgenesis.com',
		img:	'/comics/',
		extra:	[[['img[src^="/comics/"]', '', 1]]]
	},
	{	url:	'evernightcomic.com',
		style:	'#wcr_imagen{height:auto !important;}'
	},
	{	url:	'*.xindm.cn',
		img:	[['img[src*="../book/"]']],
		back:	'@id="prev" and not(contains(@href, "page=0"))',
		next:	'@id="next" and not(//select[@name="page"]/option[last()][@selected])',
		extra:	[[['select[name="page"]']]],
		scrollx:'R'
	},
	{	url:	'manga123.com',
		img:	'http://cdn.images.manga123.com/',
		back:	[/var back = '(.+?)';/, 1],
		next:	[/var next = '(.+?)';/, 1],
		fixurl:	function(url, img, link){
					// if this is a link to an interstitial page - fix it
					if(link && !url.match(/\/read(\/[^\/]+){3}/)) return url + '/1';
					return url;
				},
		scrollx:'R'
	},
	{	url:	'reader.eternalmanga.net|sakicow.com',
		img:	function(html, pos){
					var num = link[pos].match(/##.*_(\d+)/);
					num = num ? parseInt(num[1]) : 0;
					return html.match(new RegExp("imageArray\\["+num+"\\]='(.+?)';"))[1];
				},
		back:	function(html, pos){
					var num = link[pos].match(/##.*_(\d+)/);
					num = num ? parseInt(num[1])-1 : -1;
					if(num>0) return '##'+(pos-1)+'_'+num;
					return xpath('//div[@class="selector2" and starts-with(., "chapter:")]//a[contains("'+link[pos]+'", @href)]/preceding-sibling::a[1]/@href', html)+'##'+(pos-1)+'_0';
				},
		next:	function(html, pos){
					var num = link[pos].match(/##.*_(\d+)/);
					num = num ? parseInt(num[1])+1 : 1;
					if(html.match(new RegExp("imageArray\\["+num+"\\]='(.+?)';"))) return '##'+(pos+1)+'_'+num;
					return xpath('//div[@class="selector2" and starts-with(., "chapter:")]//a[contains("'+link[pos]+'", @href)]/following-sibling::a[1]/@href', html)+'##'+(pos+1)+'_0';
				},
		js:		function(dir){
					if(!dir) exec("$(document).unbind('keyup');");
				},
		layelem:'//div[@id="thePic"]',
		scrollx:'R'
	},
	{	url:	'foolrulez.org|manga.redhawkscans.com|mangatopia.net|simple-scans.com|mudascantrad.com|fallensyndicate.com|slide.extrascans.net|reader.fth-scans.com|reader.japanzai.com|manga-tu.be|friendshipscans.com',
		img:	[['#page img']],
		back:	function(html, pos){
				try{
					var relpath = xpath('//div[@class="topbar_right"]/span[@class="numbers"]/div[contains(concat(" ",@class," ")," current_page ")]/following-sibling::div[1]//@href', html);
					if (relpath.match(/^http/i)) return relpath;
					var basepath = "";
					try{ basepath = html.match(/var\s+baseurl\s*=\s*(['"])(.*?)\1\s*;/i)[2]; }
					catch(e){}
					return basepath + relpath;
				}
				catch(e){
					var chap = xpath('//div[@class="topbar_left"]/div[2]/ul/li[.//text()=//div[@class="topbar_left"]/div[2]/div/a/text()]/following-sibling::li[1]//@href', html);
					var request = new XMLHttpRequest();
					request.open('GET', chap, false); 
					request.send(null);

					if (request.status === 200) {
						return xpath('//div[@class="topbar_right"]/div[1]/ul/li[last()]//@href', request.responseText);
					}
				}
			},
		next:	function(html, pos){
				try{
					var relpath = xpath('//div[@class="topbar_right"]/span[@class="numbers"]/div[contains(concat(" ",@class," ")," current_page ")]/preceding-sibling::div[1]//@href', html);
					if (relpath.match(/^http/i)) return relpath;
					var basepath = "";
					try{ basepath = html.match(/var\s+baseurl\s*=\s*(['"])(.*?)\1\s*;/i)[2]; }
					catch(e){}
					return basepath + relpath;
				}
				catch(e){
					return xpath('//div[@class="topbar_left"]/div[2]/ul/li[.//text()=//div[@class="topbar_left"]/div[2]/div/a/text()]/preceding-sibling::li[1]//@href', html);
				}
			},
		js:		function(dir){
					if(!dir) exec("$(document).unbind('keydown');");
				},
		extra:	[function(html, pos){
					var topbar = selCss('div.topbar', html);
					if (!topbar) return;
					
					var basepath = "";
					try{ basepath = html.match(/var\s+baseurl\s*=\s*([\'\"])(.*?)\1\s*;/i)[2]; }
					catch(e){}
					var relpaths = xpath('//a[starts-with(@href,"page/")]', topbar, true);
					for (var x = 0; x < relpaths.length; ++x) {
						relpaths[x].setAttribute('href', basepath + relpaths[x].getAttribute('href'));
					}
					
					var pagesLinks = xpath('//a[@onclick]', topbar, true);
					for (var x = 0; x < pagesLinks.length; ++x) {
						pagesLinks[x].removeAttribute('onclick');
					}
					return topbar.outerHTML;
				}],
		xelem:	'//div[@class="panel"]',
		layelem:'//div[@id="page"]',
		scrollx:'R',
		style:	'#wrapper{overflow:visible !important;}'
	},
	{	url:	'manga-go.com',
		img:	[['#page1']],
		back:	'@class="prev_page"',
		next:	'@class="next_page"',
		scrollx:'R'
	},
	{	url:	'comicstriplibrary.org',
		img:	'/images/comics/',
		back:	'.="<< Previous"',
		next:	'.="Next >>"'
	},
	{	url:	'wirepop.com',
		img:	[['center>a>img, center>img']],
		scrollx:'R'
	},
	{	url:	'fantasyrealmsonline.com',
		img:	[['img[border="1"]']]
	},
	{	url:	'psychopandas.com',
		img:	'/files/',
		style:	'.imgPage span{display:none !important;}',
		scrollx:'R'
	},
	{	url:	'readonline.egscans.org|read.egscans.org',
		img:	function(html, pos){
					var num = link[pos].match(/(##.*_|\/)(\d+)$/);
					num = num ? parseInt(num[2])-1 : 0;
					return html.match(/img_url.push\('.+' \);/g)[num].match(/'(.+)'/)[1];
				},
		back:	function(html, pos){
					var num = link[pos].match(/(##.*_|\/)(\d+)$/);
					num = num ? parseInt(num[2])-1 : 0;
					if(!num){
						var base = '/' + html.match(/var prev_chap = '(.+)';/)[1] + '/';
						var htmlPrev = syncRequest(base, pos);
						num = parseInt(htmlPrev.match(/var page_max = parseInt\('(\d+)'\);/)[1]);
						base += num + '/';
					}
					else{
						var selpag = selCss('[name="page"]', html);
						base = selpag.getAttribute('onchange').match(/'(.+)', '(.+)'/);
						base = base[1]+'/'+base[2]+'/'+num;
					}
					return base+'##'+(pos-1)+'_'+num;
				},
		next:	function(html, pos){
					var num = link[pos].match(/(##.*_|\/)(\d+)$/);
					num = num ? parseInt(num[2])+1 : 2;
					var page_max = parseInt(html.match(/var page_max = parseInt\('(.+)'\);/)[1]);
					if(num > page_max){
						var base = html.match(/var next_chap = '(.+)';/)[1]+'/1';
						num = 1;
					}
					else{
						var selpag = selCss('[name="page"]', html);
						base = selpag.getAttribute('onchange').match(/'(.+)', '(.+)'/);
						base = base[1]+'/'+base[2]+'/'+num;
					}
					return base+'##'+(pos+1)+'_'+num;
				},
		extra:	[[['.pager>*', '']]],
		xelem:	'//div[@class="pager"]',
		style:	'#page_select a{display:none;} #wcr_div button{background-color:#ccc;}',
		txtcol:	'#fff',
		fixurl:	function(url, img, link){
					if(link && document.location.host == 'read.egscans.org'){
						var base = selCss('base');
						if(base) base.href = base.href.replace('readonline.egscans.org', 'read.egscans.org');
						return url.replace('readonline.egscans.org', 'read.egscans.org');
					}
					return url;
				},
		scrollx:'R'
	},
	{	url:	'gallery.ryuutama.com/view.php',
		img:	[['img']],
		back:	function(html, pos){
					if(!pos){
						var manga = html.match(/current_manga = "(.+?)";/)[1];
						var page = parseInt(html.match(/current_page = "(.+?)";/)[1]) - 1;
						var total = parseInt(html.match(/total_pages = "(.+?)";/)[1]);
						if(page) return '/api.php?grab=manga&id='+manga+'&page='+page+'##'+total;
					}
					else{
						page = parseInt(link[pos].match(/page=(\d+)/)[1]) - 1;
						if(page) return link[pos].replace(/page=(\d+)/,'page='+page);
					}
					throw 'fail';
				},
		next:	function(html, pos){
					if(!pos){
						var manga = html.match(/current_manga = "(.+?)";/)[1];
						var page = parseInt(html.match(/current_page = "(.+?)";/)[1]);
						var total = parseInt(html.match(/total_pages = "(.+?)";/)[1]);
						return '/api.php?grab=manga&id='+manga+'&page='+page+'##'+total;
					}
					else{
						page = parseInt(link[pos].match(/page=(\d+)/)[1]) + 1;
						total = parseInt(link[pos].match(/#(\d+)/)[1]);
						if(page <= total) return link[pos].replace(/page=(\d+)/,'page='+page);
					}
					throw 'fail';
				},
		scrollx:'R',
		layelem:'//div[@id="imageContainer"]'
	},
	{	url:	'gallery.ryuutama.com/api.php',
		img:	function(html, pos){
					redirect(link[0].replace('api.php?grab=manga&id=', 'view.php?manga='));
				}
	},
	{	url:	'*.tiraecol.net',
		img:	[['img[src*="tiraecol.net/modules/comic/cache/images/"]']],
		back:	['//td[@width="200px" and @align="left"]/a[2]'],
		next:	['//td[@width="200px" and @align="right"]/a[1]'],
		extra:	[[['.title']]]
	},
	{	url:	'conejofrustrado.com',
		back:	'@class="navAnterior"',
		next:	'@class="navSiguiente"'
	},
	{	url:	'e2w-illustration.com',
		img:	'http://www.e2w-illustration.com/images/'
	},
	{	url:	'2gamerz.com',
		img:	'http://2gamerz.com/wp-content/webcomic/'
	},
	{	url:	'mymangaspot.com',
		img:	[['.mng_rdr a img']],
		back:	'.="Prev"',
		next:	'.="Next"',
		extra:	[[['.wpm_nav select', ' ', 0, 2]]],
		style:	'.mng_rdr>div{overflow:visible !important;}',
		scrollx:'R'
	},
	{	url:	'comic.naver.com',
		img:	[['.wt_viewer img']],
		back:	[['.pre a']],
		next:	[['.next a']],
		extra:	[[['.wt_viewer img', '<br/>', 1]]],
		style:	'.wt_viewer>img{display:none;}'
	},
	{	url:	'mangatraders.com',
		img:	[['#image']],
		back:	[/value="Prev Page" onclick="window.location.href='([^']+)'"/, 1],
		next:	[/value="Next Page" onclick="window.location.href='([^']+)'"/, 1],
		js:		function(dir){
					exec('window.removeEventListener("keydown", handleKey, true)');
				},
		scrollx:'R',
		extra:	[[['div#viewerHeader>div', '']], '<div class="clear"></div>', [['div#file_dropdown_top', '']], [['div#page_dropdown_top']], [['div#reportLink']], [['div#image_display div']]],
		xelem:	'//div[@id="viewerHeader"]',
		layelem:'//div[@id="image_display"]',
		style:	'#page_dropdown_top,#file_dropdown_top,#page_path_bottom,#reportLink{display:none} #viewerHeader>div{display:block} #reportLink{padding-top:0 !important'
	},
	{	url:	'hentaifromhell.net',
		img:	[['img.imageborder']],
		scrollx:'R'
	},
	{	url:	'trenchescomic.com',
		img:	[['.comic img']]
	},
	{	url:	'goominet.com',
		img:	[['center>img[src^="uploads/"]']],
		extra:	[[['center>img[src^="t"]']]]
	},
	{	url:	'doesnotplaywellwithothers.com',
		extra:	[[['#sidebar-undercomic p']]]
	},
	{	url:	'aikoniacomic.com',
		style:	'#comic{height:auto;}',
		extra:	[[['#blurb']]]
	},
	{	url:	'grrlpowercomic.com',
		extra:	[[['.post-comic']]]
	},
	{	url:	'the-whiteboard.com',
		img:	[['center>img']]
	},
	{	url:	'mezzacotta.net',
		extra:	[[['h2']], ['//h2/following-sibling::p', '', 2]]
	},
	{	url:	'hbrowse.com',
		img:	[['.pageImage img']]
	},
	{	url:	'vexxarr.com',
		img:	[['img[src^="Vexxarr"]:not([src*="header"])']],
		extra:	[[['b']]]
	},
	{	url:	'aptitude.surfacingpoint.com',
		img:	'comics/',
		extra:	[[['.rant']]]
	},
	{	url:	'fancyadventures.com',
		extra:	[[['.entry p']]]
	},
	{	url:	'chron.com',
		img:	[['div.hst-comic li>img']],
		back:	'img[@id="hst_galleryitem_index_prev_en"]',
		next:	'img[@id="hst_galleryitem_index_next_en"]'
	},
	{	url:	'heroeslocales.com',
		img:	[['#comic img']],
		back:	'img[contains(@src, "/b_ant.png")]',
		next:	'img[contains(@src, "/b_sig.png")]'
	},
	{	url:	'readhentaionline.com',
		img:	[['div[align="center"] img']],
		next:	[['div[align="center"] a']]
	},
	{	url:	'darklegacycomics.com',
		img:	[['td[background="comic_mid.gif"] img']]
	},
	{	url:	'bearmageddon.com',
		extra:	[[['.post']]]
	},
	{	url:	'betweenfailures.net',
		img:	'http://betweenfailures.net/wp-content/webcomic/',
		extra:	[[['.webcomic_post h1']], [['.webcomic_post .content']]]
	},
	{	url:	'sisterclaire.com',
		back:	function(html, pos){
					try{ return xpath('//a[.="Previous"]', html); }
					catch(e){ return xpath('//a[.="Previous Chapter"]', html); }
				},
		next:	'.="Next" or .="Next Chapter"',
		extra:	[[['.entry']]]
	},
	{	url:	'fayerwayer.com|niubie.com',
		img:	[['.attachment-post-full-galeria']],
		back:	'.="Anterior"',
		next:	'.="Próxima"'
	},
	{	url:	'awesomehospital.com',
		extra:	[[['.post-comic']]]
	},
	{	url:	'ars.userfriendly.org',
		img:	'http://www.userfriendly.org/cartoons/archives/',
		back:	[['[alt="Previous Cartoon"]']],
		next:	[['[alt="Next Day\'s Cartoon"]']]
	},
	{	url:	'friendswithboys.com',
		img:	[['.entry img']],
		extra:	[[['.entry>*', '', 1]]]
	},
	{	url:	'calamitiesofnature.com',
		img:	[['#comic img']]
	},
	{	url:	'irregularwebcomic.net',
		extra:	[[['#annotation']]],
		style:	'div.hide {display: block; text-align: left;}',
	},
	{	url:	'adistantsoil.com',
		back:	'@title="Previous"',
		next:	'@title="Next"',
		extra:	[['//div[@class="post-content"]']],
		bgcol:	'#f4eebc'
	},
	{	url:	'kronos.mcanime.net',
		img:	[['#current-image img']],
		back:	function(html, pos){
					try{ return xpath('//select[@id="pages"]/option[@selected]/preceding-sibling::option[1]/@value', html); }
					catch(e){
						var cap = xpath('//select[@id="chapters"]/option[@selected]/following-sibling::option[1]/@value', html);
						var pag = xpath('//input[@id="lastpage"]/@value', html);
						return cap.replace(/\/\d+$/, pag);
					}
				},
		next:	function(html, pos){
					try{ return xpath('//select[@id="pages"]/option[@selected]/following-sibling::option[1]/@value', html); }
					catch(e){ return xpath('//select[@id="chapters"]/option[@selected]/preceding-sibling::option[1]/@value', html); }
				},
		scrollx:'R'
	},
	{	url:	'ghastlycomic.com',
		extra:	[function(html, pos){
					iframe = xpath('//iframe[@id="newsbox"]', html);
					blockquote = iframe.parentNode;
					blockquote.removeChild(iframe);
					return blockquote;
				}],
	},
	{	url:	'walkingdeadbr.com',
		img:	'albums/'
	},
	{	url:	'mangapanda.com',
		scrollx:'R'
	},
	{	url:	'mangable.com',
		img:	[['#image']],
		scrollx:'R'
	},
	{	url:	'dragonflyscans.org',
		img:	[['#page img']],
		scrollx:'R'
	},
	{	url:	'readincesthentai.com|hentaistreamer.com',
		img:	[['.picture']],
		scrollx:'R',
		style:	'#container{width:auto;}'
	},
	{	url:	'kissmanga.com',
		img:	function(html, pos){
					var imgs = html.match(/lstImages\.push\(".+?"\);/g);
					var num = pos ? Number(link[pos].match(/##(\d+);/)[1]) : 0;

					return imgs[pos-num].match(/"(.+)"/)[1];
				},
		back:	function(html, pos){
					throw 'fail';
				},
		next:	function(html, pos){
					if(!pos) return '##0;1';

					var imgs = html.match(/lstImages\.push\(".+?"\);/g);
					var num = Number(link[pos].match(/##(\d+);/)[1]);

					if(num+imgs.length > pos+1) return '##' + num + ';' + (pos+1);

					return xpath('//select[@id="selectChapter"]/option[@selected]/following-sibling::option[1]/@value', html) +
						'##' + (num+imgs.length) + ';' + (pos+1);
				},
		scrollx:'R',
		layelem:'//img[@id="imgCurrent"]'
	},
	{	url:	'readmangahentai.com',
		img:	function(html, pos){
					var imgs = html.match(/lstImages\.push\(".+?"\);/g);
					var num = pos ? Number(link[pos].match(/##(\d+);/)[1]) : 0;

					return imgs[pos-num].match(/"(.+)"/)[1];
				},
		back:	function(html, pos){
					throw 'fail';
				},
		next:	function(html, pos){
					if(!pos) return '##0;1';

					var imgs = html.match(/lstImages\.push\(".+?"\);/g);
					var num = Number(link[pos].match(/##(\d+);/)[1]);

					if(num+imgs.length > pos+1) return '##' + num + ';' + (pos+1);

					return xpath('//select[@id="chapter_select"]/option[@selected]/preceding-sibling::option[1]/@value', html) +
						'.html##' + (num+imgs.length) + ';' + (pos+1);
				},
		scrollx:'R',
		layelem:'//div[@id="image"]',
		js:		function(dir){
					if(!dir) document.onkeyup = '';
				}
	},
	{	url:	'masterbloodfer.org',
		scrollx:'R'
	},
	{	url:	'mangatank.com|mangapark.com',
		img:	[['.img-link img']],
		style:	'#wcr_div{line-height:1;}',
		js:		function(dir){
					if(!dir)  document.onkeyup = '';
				},
		scrollx:'R'
	},
	{	url:	'snowflakescomic.com',
		back:	'./img[contains(@src, "nav_prior")]'
	},
	{	url:	'mangafox.mobi',
		img:	[['a img']],
		back:	'.="Previous Page"',
		next:	'img',
		scrollx:'R'
	},
	{	url:	'mangainn.com',
		img:	[['#imgPage']],
		back:	function(html, pos){
					try{
						return link[pos].replace(/[^\/]+$/, 'page_') +
							xpath('//select[@id="cmbpages"]/option[@selected]/preceding-sibling::option[1]/@value', html);
					}catch(e){
						return link[pos].replace(/[^\/]+\/[^\/]+$/, '') +
							xpath('//select[@id="chapters"]/option[@selected]/preceding-sibling::option[1]/@value', html) +
							'/pages_1';
					}
				},
		next:	function(html, pos){
					try{
						return link[pos].replace(/[^\/]+$/, 'page_') +
							xpath('//select[@id="cmbpages"]/option[@selected]/following-sibling::option[1]/@value', html);
					}catch(e){
						return link[pos].replace(/[^\/]+\/[^\/]+$/, '') +
							xpath('//select[@id="chapters"]/option[@selected]/following-sibling::option[1]/@value', html) +
							'/pages_1';
					}
				},
		scrollx:'R'
	},
	{	url:	'shiftylook.com',
		img:	[['.the-comic img']],
		style:	'.the-comic{height:auto !important;}'
	},
	{	url:	'onlinereader.mangapirate.net',
		img:	[['#page']],
		back:	'@id="prev"',
		next:	'@id="next"'
	},
	{	url:	'8comic.com',
		img:	function(html, pos){
					var ch = link[pos].match(/ch=([\d-]+)/)[1].split('-');
					var p = ch.length > 1 ? parseInt(ch[1]) : 1;
					ch = parseInt(ch[0]);

					var chs = parseInt(html.match(/var chs=(\d+)/)[1]);
					var itemid = parseInt(html.match(/var itemid=(\d+)/)[1]);

					var codes = html.match(/var codes="([^\"]+)"/)[1].split('|');
					var code="";
					var cid=0;
					for(i=0;i<codes.length;i++){if(codes[i].indexOf(ch+" ")==0){cid=i;code=codes[i];break;};}
					if(code=="") for(i=0;i<codes.length;i++){if(parseInt(codes[i].split(' ')[0])>ch) {cid=i;code=codes[i];ch=parseInt(codes[i].split(' ')[0]);break;}}
					if(code=="") {cid=codes.length-1;code=codes[cid];ch=chs;}

					var previd=cid>0?parseInt(codes[cid-1].split(' ')[0]):ch;
					var nextid=cid<codes.length-1?parseInt(codes[cid+1].split(' ')[0]):ch;
					var num=code.split(' ')[0];
					var sid=code.split(' ')[1];
					var did=code.split(' ')[2];
					var page=code.split(' ')[3];
					var code=code.split(' ')[4];

					var img="";
					if(p<10) img="00"+p;else if(p<100) img="0"+p;else img=p;
					var m=(parseInt((p-1)/10)%10)+(((p-1)%10)*3);
					img+="_"+code.substring(m,m+3);
					return "http://img"+sid+".8comic.com/"+did+"/"+itemid+"/"+num+"/"+img+".jpg";
				},
		back:	function(html, pos){
					var ch = link[pos].match(/ch=([\d-]+)/)[1].split('-');
					var p = ch.length > 1 ? parseInt(ch[1]) : 1;
					ch = parseInt(ch[0]);

					var chs = parseInt(html.match(/var chs=(\d+)/)[1]);
					var itemid = parseInt(html.match(/var itemid=(\d+)/)[1]);

					var codes = html.match(/var codes="([^\"]+)"/)[1].split('|');
					var code="";
					var cid=0;
					for(i=0;i<codes.length;i++){if(codes[i].indexOf(ch+" ")==0){cid=i;code=codes[i];break;};}
					if(code=="") for(i=0;i<codes.length;i++){if(parseInt(codes[i].split(' ')[0])>ch) {cid=i;code=codes[i];ch=parseInt(codes[i].split(' ')[0]);break;}}
					if(code=="") {cid=codes.length-1;code=codes[cid];ch=chs;}

					var previd=cid>0?parseInt(codes[cid-1].split(' ')[0]):ch;
					var nextid=cid<codes.length-1?parseInt(codes[cid+1].split(' ')[0]):ch;
					var num=code.split(' ')[0];
					var sid=code.split(' ')[1];
					var did=code.split(' ')[2];
					var page=code.split(' ')[3];
					var code=code.split(' ')[4];

					var x = ch+'-'+(p-1);
					if(p<=1){
						if(ch<=1) throw 'first';
						x = previd;
					}
					return link[pos].replace(/ch=.+/, 'ch='+x);
				},
		next:	function(html, pos){
					var ch = link[pos].match(/ch=([\d-]+)/)[1].split('-');
					var p = ch.length > 1 ? parseInt(ch[1]) : 1;
					ch = parseInt(ch[0]);

					var chs = parseInt(html.match(/var chs=(\d+)/)[1]);
					var itemid = parseInt(html.match(/var itemid=(\d+)/)[1]);

					var codes = html.match(/var codes="([^\"]+)"/)[1].split('|');
					var code="";
					var cid=0;
					for(i=0;i<codes.length;i++){if(codes[i].indexOf(ch+" ")==0){cid=i;code=codes[i];break;};}
					if(code=="") for(i=0;i<codes.length;i++){if(parseInt(codes[i].split(' ')[0])>ch) {cid=i;code=codes[i];ch=parseInt(codes[i].split(' ')[0]);break;}}
					if(code=="") {cid=codes.length-1;code=codes[cid];ch=chs;}

					var previd=cid>0?parseInt(codes[cid-1].split(' ')[0]):ch;
					var nextid=cid<codes.length-1?parseInt(codes[cid+1].split(' ')[0]):ch;
					var num=code.split(' ')[0];
					var sid=code.split(' ')[1];
					var did=code.split(' ')[2];
					var page=code.split(' ')[3];
					var code=code.split(' ')[4];

					var x = ch+'-'+(p+1);
					if(p>=page){
						if(ch>=chs) throw 'last';
						x = nextid;
					}
					return link[pos].replace(/ch=.+/, 'ch='+x);
				},
		scrollx:'R'
	},
	{	url:	'mangahead.com',
		img:	[['#mangahead_image']],
		back:	'@id="page_previous"',
		next:	'@id="page_next"',
		scrollx:'R'
	},
	{	url:	'vickifox.com',
		img:	[['.comic']]
	},
	{	url:	'spinnyverse.com',
		back:	[['.nav-previous a']],
		next:	[['.nav-next a']]
	},
	{	url:	'zenpencils.com',
		extra:	[[['.comicpress_comic_blog_post_widget']]]
	},
	{	url:	'wootmanga.com',
		fixurl:	function(url, img, link){
					if(link && url.split('/').length == 5) url += '/1';
					return url;
				},
		scrollx:'R'
	},
	{	url:	'hentai2read.com',
		img:	[['.prw img']],
		back:	function(html, pos){
					var baseurl = xpath('(//select[@class="cbo_wpm_chp"])/@onchange', html).replace(/^.*?'|'.*$/gi, '');
					try{
						var pag = xpath('(//select[@class="cbo_wpm_pag"])/option[@selected]/preceding-sibling::option[1]/@value', html);
						var chap = selCss('select.cbo_wpm_chp > option[selected]', html).value;
						return baseurl + chap +'/' + pag + '/';
					}
					catch(e){
						var chap = xpath('(//select[@class="cbo_wpm_chp"])/option[@selected]/following-sibling::option[1]/@value', html);
						var htmlPrev = syncRequest(baseurl + chap +'/', pos);
						var pag = xpath('(//select[@class="cbo_wpm_pag"])/option[last()]/@value', htmlPrev);
						return baseurl + chap +'/' + pag + '/';
					}
				},
		next:	['//div[@class="wpm_seo"]/a[.="Next" and not(@href="")]'],
		extra:	[[['.wpm_nav']]],
		style:	'#wcr_imagen{max-width:none;} .prw{overflow:visible !important;} div.wpm_nav{display:none} #wcr_extra>div.wpm_nav{display:block}',
		fixurl:	function(url, img, link) {
			if (link) return url.replace('m.hentai2read.com', 'hentai2read.com');
			return url;
		},
		scrollx:'R'
	},
	{	url:	'm.hentai2read.com',
		img:	[['.prw img']],
		back:	function(html, pos){
					var baseurl = xpath('//select[@class="cbo_wpm_chp"]/@onchange', html).replace(/^.*?'|'.*$/gi, '');
					try{
						var pag = xpath('//select[@class="cbo_wpm_pag"]/option[@selected]/preceding-sibling::option[1]/@value', html);
						var chap = selCss('select.cbo_wpm_chp > option[selected]', html).value;
						return baseurl + chap +'/' + pag + '/';
					}
					catch(e){
						var chap = xpath('//select[@class="cbo_wpm_chp"]/option[@selected]/following-sibling::option[1]/@value', html);
						var htmlPrev = syncRequest(baseurl + chap +'/', pos);
						var pag = xpath('//select[@class="cbo_wpm_pag"]/option[last()]/@value', htmlPrev);
						return baseurl + chap +'/' + pag + '/';
					}
				},
		next:	['//img[contains(concat(" ",@class," ")," cmd ") and @alt="Next Page" and starts-with(../@href,"http")]/..'],
		extra:	['<span style="float:left">Chapter ', [['.cbo_wpm_chp']], '</span><span style="float:right">Page ', [['.cbo_wpm_pag']], '</span><span class="clr"></span>'],
		style:	'.header{position:relative;} .content-box{padding-top:20px;} #wcr_imagen{max-width:none;} .prw{overflow:visible !important;} div.wpm_nav{display:none}',
		scrollx:'R'
	},
	{	url:	'komikmy.com',
		img:	[['.wpm_pag img']],
		style:	'.bmk + div{overflow:visible !important;}',
		scrollx:'R'
	},
	{	url:	'hentaifr.net',
		img:	'http://www.hentaifr.net/contenu/',
		back:	'img[contains(@src, "previous")]',
		next:	'img[contains(@src, "suivant")]',
		scrollx:'R'
	},
	{	url:	'sientoymiento.cl',
		img:	[['.entry-content img']]
	},
	{	url:	'mangasky.com',
		img:	[['.manga-page']],
		scrollx:'R'
	},
	{	url:	'mangapirate.net',
		img:	[['#mangapage']],
		scrollx:'R'
	},
	{	url:	'nomanga.com',
		img:	[['div.prw>a>img']],
		extra:	[[['.wpm_nav']]],
		scrollx:'R'
	},
	{	url:	'pipi.cl',
		img:	[['#tira']],
		back:	[['#prev']],
		next:	[['#next']]
	},
	{	url:	'hentaimangaonline.com',
		img:	[['#p']],
		back:	function(html, pos){
					var pageid = match(html, /var pageid = (\w+);/, 1);
					var pages = match(html, /var pages=new Array\((.+?)\);/, 1).split(',');
					var idx = pages.indexOf(pageid);
					if(!pages[idx-1]) throw 'fail';
					return link[pos].replace(pageid, pages[idx-1]);
				},
		next:	function(html, pos){
					var pageid = match(html, /var pageid = (\w+);/, 1);
					var pages = match(html, /var pages=new Array\((.+?)\);/, 1).split(',');
					var idx = pages.indexOf(pageid);
					if(!pages[idx+1]) throw 'fail';
					return link[pos].replace(pageid, pages[idx+1]);
				},
		style:	'.pull-left{max-width:none !important;}',
		scrollx:'R'
	},
	{	url:	'webcomics.yaoi911.com',
		img:	[['.webcomic-object img']],
		back:	'@rel="previous"',
		next:	'@rel="next"'
	},
	{	url:	'actiontimebuddies.com',
		img:	[['#comic img']],
		back:	function(html, pos){
					try{ return selCss('a.navi-prev-in', html); }
					catch(e){ return selCss('a.navi-prevchap', html); }
				},
		extra:	[[['#comic img', '', 1]], [['.entry']]]
	},
	{	url:	'superbrophybrothers.com',
		img:	[['.post-body img']],
		back:	'.="Back"',
		next:	'.="Next"',
		extra:	[['//div[contains(@class, "post-body")]//span[@title]/@title'], '<br/>',
					['//u[.="News"]/following::span[./ancestor::*[contains(@class, "post-body")] and not(./ancestor::span/ancestor::*[contains(@class, "post-body")])]', '<br/>']]
	},
	{	url:	'surasplace.com',
		img:	function(html, pos){
					var data = document.querySelectorAll('a.sigProLink'),
					x = link[0].match(/[&?]ipage=(.*?)(&|$)/i);
					x = Number(x ? x[1] : 0) + pos;
					if(!x) return '.';
					if(x<0 || x>data.length) throw 'fail';
					return data[x-1].getAttribute('image-src') || data[x-1].href;
				},
		back:	function(html, pos){
					var data = document.querySelectorAll('a.sigProLink'),
					pgregex = /(\\?|\\&)ipage=(.*?)(?=(&|$))/i,
					x = link[0].match(pgregex);
					x = Number(x ? x[2] : 0) + pos - 1;
					if (x<0 || x>data.length) throw 'fail';
					if (!x) return link[0].replace(/#.*$|(\\?|\\&)ipage=(.*?)(&|$)/gi, '');
					if (pgregex.test(link[0])) return link[0].replace(pgregex, '$1ipage=' + x);
					return link[0].replace(/#.*$/, '') + (/\?./.test(link[0])?'&':'?') + 'ipage=' + x;
				},
		next:	function(html, pos){
					var data = document.querySelectorAll('a.sigProLink'),
					pgregex = /(\\?|\\&)ipage=(.*?)(?=(&|$))/i,
					x = link[0].match(pgregex);
					x = Number(x ? x[2] : 0)+pos+1;
					if(x<0 || x>data.length) throw 'fail';
					if (pgregex.test(link[0])) return link[0].replace(pgregex, '$1ipage=' + x);
					return link[0].replace(/#.*$/, '') + (/\?./.test(link[0])?'&':'?') + 'ipage=' + x;
				},
		extra:	['Images from article: ', ['//div[@class="page-header"]/following-sibling::p[1]/text()'],
					function(html, pos){
						var data = document.querySelectorAll('a.sigProLink'),
						x = link[0].match(/[&?]ipage=(.*?)(&|$)/i);
						if (!(data && data.length)) throw 'fail';
						x = Number(x ? x[1] : 0)+pos;
						if (!x) return "<br/>Thumbs";
						var filename = data[x-1].getAttribute('image-src') || data[x-1].href;
						return "<br/>Image " + x + " of " + data.length + " (File: '" + filename.replace(/^.*\//, '') + "')";
					}
				],
		js:		function(dir){
					var pgregex = /(\\?|\\&)ipage=.*?(?=(&|$))/i, x;
					x = link[0].match(pgregex);
					x = Number(x ? x[2] : 0)+posActual;
					if (!x) scrollTo(0,0);
					
					if (!dir) {
						function changeIPage(url, pagenum) {
							if (pgregex.test(url)) return url.replace(pgregex, '$1ipage=' + pagenum);
							return url.replace(/#.*$/, '') + (/\?./.test(url)?'&':'?') + 'ipage=' + pagenum;
						}
						
						var contentLinks = document.querySelectorAll('a.sigProLink');
						for (x = 0; x < contentLinks.length;) {
							contentLinks[x].removeAttribute('rel');
							contentLinks[x].removeAttribute('target');
							contentLinks[x].setAttribute('image-src', contentLinks[x].href);
							contentLinks[x].href = changeIPage(link[0], ++x);
						}
					}
				},
		scrollx:'R',
		layelem:'//div[@class="sigProPrintMessage"]',
		style:	'#header, .navbar-fixed-top, .navbar-fixed-bottom {position:static;}'
	},
	{	url:	'mangacow.me',
		img:	[['.prw img']],
		back:	function(html, pos){
					var baseurl = xpath('(//select[@class="cbo_wpm_chp"])/@onchange', html).replace(/^.*?'|'.*$/g, '');
					try{
						var pag = xpath('(//select[@class="cbo_wpm_pag"])/option[@selected]/preceding-sibling::option[1]/@value', html);
						var chap = selCss('select.cbo_wpm_chp > option[selected]', html).value;
						return baseurl + chap +'/' + pag + '/';
					}
					catch(e){
						var chap = xpath('(//select[@class="cbo_wpm_chp"])/option[@selected]/following-sibling::option[1]/@value', html);
						var request = new XMLHttpRequest();
						request.open('GET', baseurl + chap +'/', false); 
						request.send(null);

						if (request.status === 200) {
							var pag = xpath('(//select[@class="cbo_wpm_pag"])/option[last()]/@value', request.responseText);
							return baseurl + chap +'/' + pag + '/';
						}
					}
				},
		extra:	[[['div.wpm_nav']]],
		style:	'div.wpm_nav {display:none} #wcr_extra>div.wpm_nav {display:block}',
		scrollx:'R'
	},
	{	url:	'thedevilspanties.com',
		extra:	[['//div[@class="entry"]']],
	},
	{	url:	'hentai4manga.com',
		img:	[['#textboxContent img']],
		back:	[['#sub_page_left a']],
		next:	[['#sub_page_right a']],
		style:	'#innerWrapper, .content{width: auto !important; max-width: none !important;} .textbox > div{float: none !important;}',
		scrollx:'R'
	},
	{	url:	'bradcolbow.com',
		img:	[['.entry img']],
		extra:	[[['h2']], [['h5']]]
	},
	{	url:	'gaomanga.com',
		img:	[['#slice0']],
		back:	['//div[@class="pageButtonDivSelected"]/preceding-sibling::div[1]/a'],
		scrollx:'R'
	},
	{	url:	'guildedage.net',
		img:	[['#comic img']],
		back:	[['.navi-prev']],
		next:	[['.navi-next']]
	},
	{	url:	'betweenfailures.com',
		img:	[['.webcomic-image img']]
	},
	{	url:	'claudeandmonet.com',
		img:	[['.webcomic-object img']]
	},
	{	url:	'phobia.subcultura.es',
		img:	[['#tira img']],
		back:	'.="Anterior"',
		next:	'.="Siguiente"'
	},
	{	url:	'de.ninemanga.com',
		img:	[['.manga_pic']],
		back:	[['.blue']],
		next:	'.=">>"',
		scrollx:'R'
	},
	{	url:	'proxer.me',
		img:	[['.open']],
		back:	function(html, pos){
					var c = parseInt(match(link[pos], /[?&]c=(\d+)/, 1, 1));
					var p = parseInt(match(link[pos], /[?&]p=(\d+)/, 1, 1)) - 1;
					if(!p){
						c--;
						p=1
					}
					console.log([pos,-1,c,p]);
					if(!c) throw 'inicio';
					return link[pos].replace(/&[cp]=\d+/g, '') + '&c='+c+'&p='+p;
				},
		next:	function(html, pos){
					var c = parseInt(match(link[pos], /[?&]c=(\d+)/, 1, 1));
					var p = parseInt(match(link[pos], /[?&]p=(\d+)/, 1, 1)) + 1;
					try { selCss('.number_'+p, html); }
					catch(e){
						c++;
						p=1;
					}
					console.log([pos,1,c,p]);
					return link[pos].replace(/&[cp]=\d+/g, '') + '&c='+c+'&p='+p;
				},
		scrollx:'R'
	},
	{	url:	'meinmanga.com',
		img:	[['.pic_fragment,.pic_fragment_biggest']],
		back:	function(html, pos){
					try{ return xpath('//table[@class="pagebar"]//td[3]/select/option[@selected]/preceding-sibling::option[1]/@value', html) + '.html'; }
					catch(e){ return xpath('//table[@class="pagebar"]//td[1]/select/option[@selected]/following-sibling::option[1]/@value', html); }
				},
		next:	function(html, pos){
					try{ return xpath('//table[@class="pagebar"]//td[3]/select/option[@selected]/following-sibling::option[1]/@value', html) + '.html'; }
					catch(e){ return xpath('//table[@class="pagebar"]//td[1]/select/option[@selected]/preceding-sibling::option[1]/@value', html); }
				},
		extra:	[[['.pic_fragment,.pic_fragment_biggest', '<br/>', 1]], '<br/>', [['.pagebar']]],
		layelem:'//div[@class="topad"]',
		style:	'#content > table:not(.pagebar){display:none;} .pic_fragment_biggest{margin-left:0;} #content{overflow:visible;}',
		scrollx:'R'
	},
	{	url:	'*.senmanga.com',
		img:	function(html, pos){
					try{ match(html, /img\.src *= *'([^\']+)'/, 1); }
					catch(e){ return selCss('#picture', html); }
				},
		back:	function(html, pos){
					try{ return xpath('//a[.="Back"]', html); }
					catch(e){
						var manga = document.location.pathname.match(/^\/[^\/]+\//)[0];
						return manga + xpath('//select[@name="chapter"]/option[@selected]/following-sibling::option[1]/@value', html);
					}
				},
		next:	function(html, pos){
					try{ return xpath('//a[.="Next"]', html); }
					catch(e){
						var manga = document.location.pathname.match(/^\/[^\/]+\//)[0];
						return manga + xpath('//select[@name="chapter"]/option[@selected]/preceding-sibling::option[1]/@value', html);
					}
				},
		scrollx:'R'
	},
	{	url:	'mangaesta.net|www.mabuns.web.id|manga4indo.com',
		img:	function(html, pos){
					var page = match(link[pos], /page=(\d+)$/, 1, 1);
					var pages = html.match(/addpage\('(.+)?'.*\)/g);
					return pages[page-1].match(/'(.+?)'/)[1];
				},
		back:	function(html, pos){
					var page = match(link[pos], /page=(\d+)$/, 1, 1);
					if(--page) return link[pos].replace(/(##page=\d+)?$/, '##page='+page);
					throw 'first';
				},
		next:	function(html, pos){
					var page = match(link[pos], /page=(\d+)$/, 1, 1);
					var pages = html.match(/addpage\('(.+)?'.*\)/g);
					if(++page <= pages.length) return link[pos].replace(/(##page=\d+)?$/, '##page='+page);
					throw 'last';
				},
		layelem:'//span[@id="page"]',
		scrollx:'R'
	},
	{	url:	'bloomingfaeries.com',
		img:	[['#comic img']]
	},
	{	url:	'neechan.net',
		img:	[['.prw img']],
		scrollx:'R'
	},
	{	url:	'*.komikid.com',
		img:	[['td>a>img']],
		back:	function(html, pos){
					try{ return xpath('//a[img[@title="Previous Page"]]', html); }
					catch(e){
						var chapter = xpath('//select[@name="chapter"]/option[@selected]/following-sibling::option[1]/@value', html);
						return link[pos].replace(/(\/\/([^\/]+\/){2}).*/, '$1' + chapter);
	}
				},
		next:	function(html, pos){
					try{ return xpath('//a[img[@title="Next Page"]]', html); }
					catch(e){
						var chapter = xpath('//select[@name="chapter"]/option[@selected]/preceding-sibling::option[1]/@value', html);
						return link[pos].replace(/(\/\/([^\/]+\/){2}).*/, '$1' + chapter);
					}
				},
		scrollx:'R'
	},
	{	url:	'moonoverjune.com',
		img:	[['.comicpage']]
	},
	{	url:	'shadbase.com|shagbase.com',
		img:	[['#comic img']],
		extra:	[['//div[@id="comic-1" and not(img)]'], [['#comic .comicpane', '', 1]]],
		layelem:'//div[@id="comic"]'
	},
	{	url:	'mangago.com',
		img:	[['#page1']],
		scrollx:'R'
	},
	{	url:	'mrlovenstein.com',
		img:	[['.comic_image div img']],
		back:	'img[contains(@src, "nav_left")]',
		next:	'img[contains(@src, "nav_right")]',
		layelem:'//div[@class="comic_image"]'
	},
	{	url:	'anticscomic.com',
		img:	[['#comic img']]
	},
	{	url:	'octopuns.blogspot.com',
		img:	[['.post-body img']],
		back:	'img[contains(@src,"Back.png")]',
		next:	'img[contains(@src,"Next.png")]',
		extra:	[['//div[contains(@class, "post-body")]/*[not(@class="separator") or contains(@style, "text-align: left")] | //div[contains(@class, "post-body")]/text()', '']],
		fixurl:	function(url, img, link){
					if(link) return url.replace('.com.au/', '.com/');
					return url;
				}
	},
	{	url:	'onemanga.me|mangabee.com',
		img:	[['.manga-page']],
		scrollx:'R'
	},
	{	url:	'mngacow.com|mangadoom.com',
		img:	[['.prw a img']],
		style:	'#wcr_imagen{max-width:none;}',
		scrollx:'R'
	},
	{	url:	'ver-manga.net',
		img:	'http://www.ver-manga.net/cdn/',
		back:	'.="Anterior"',
		next:	'.="Siguiente"',
		scrollx:'R'
	},
	{	url:	'powernapcomic.com',
		img:	[['center > img']],
		extra:	[[['.titulo2']], [['.titulo2 + .news']]]
	},
	{	url:	'ismanga.com',
		style:	'#wcr_imagen{max-width:none;}',
		scrollx:'R'
	},
	{	url:	'mangabird.com',
		img:	'http://image.mangabird.info/sites/default/files/',
		back:	function(html, pos){
					return link[pos].replace(/(page=)(\d+)/, function(s, p, n){
						return n=='0' ? s : p + (parseInt(n) - 1);
					});
				},
		next:	[['.content a']],
		style:	'#wcr_imagen{max-width:none;}',
		scrollx:'R'
	},
	{	url:	'mangachrome.com',
		img:	[/src="([^\"]+)".+name="img"/, 1],
		scrollx:'R'
	},
	{	url:	'7manga.com',
		img:	function(html, pos){
					if(!pos) return get('TheImg');
					var m = link[pos].match(/[&?]n=(\d+)/);
					var n = m ? parseInt(m[1]) : 1;
					return imagen[0].replace(/\/0\/.+$/, '/0/' + selCss('#pic', html).value.split('\n')[n-1] + '.jpg');
				},
		back:	function(html, pos){
					var m = link[pos].match(/[&?]n=(\d+)/);
					var n = m ? parseInt(m[1]) : 1;
					if(n > 1) return link[pos].replace(/([&?]n=)\d+/, '$1'+(n-1));
					return link[pos].replace(/(\d+)\.html/, function(s, n){
						return n=='1' ? s : (parseInt(n) - 1) + '.html';
					});
				},
		next:	function(html, pos){
					var pc = html.match(/var pc=.*?(\d+)/)[1];
					var m = link[pos].match(/[&?]n=(\d+)/);
					var n = m ? parseInt(m[1]) : 0;
					if(n != pc){
						if(n) return link[pos].replace(/([&?]n=)\d+/, '$1'+(n+1));
						return link[pos] + '?n=2';
					}
					return link[pos].replace(/(\d+)\.html.+/, function(s, n){
						return n=='1' ? s : (parseInt(n) + 1) + '.html';
					});
				},
		scrollx:'R'
	},
	{	url:	'mangadevil.com',
		img:	[['#manga_image img']],
		scrollx:'R'
	},
	{	url:	'mangamofo.com',
		img:	[['.prw img']],
		style:	'#wcr_imagen{max-width:none;}.prw{overflow:visible !important;}',
		scrollx:'R'
	}
	/*
	,
	{	url:	'',
		img:	'',
		back:	'',
		next:	''
	}
	,
	{	url:	'',
		img:	'',
		back:	'',
		next:	'',
		first:	'',
		last:	'',
		extra:	[[['']]],
		fixurl:	function(url, img, link){
				},
		js:		function(dir){
				},
		scrollx:'R',
		xelem:	'',
		layelem:'',
		txtcol:	'',
		bgcol:	'',
		style:	'',
		layout:	true
	}
	*/

];

/* xpath:
	X = elemento X
	@A = atributo A
	* = comodin
	. = self, innerHTML al usarla en condiciones, usar /text() para retornar el texto
	X[Y] = X q cumple Y (Y puede referenciar atributos o hijos)
	X[num o last()] = el X q es el num-esimo hijo de su padre
	.. = parentNode
	/ = hijo
	// = descendiente
	contains(x, y) = x.indexOf(y)>=0
	starts-with(x, y) = x.indexOf(y)==0
	name() = nombre del tag EN MAYUSCULAS
	X | Y = lo q matchee el xpath X o el Y
	http://xpath.alephzarro.com/content/cheatsheet.html
	http://www.zvon.org/xxl/XPathTutorial/General/examples.html
*/

var imagen = new Array(); //src de la imagen[i]
var imagenOK = [true]; //dice si la imagen[i] esta cargada
var imagen64 = new Array(); //contenido de la imagen[i] como data:url en base64
var imgTitle = new Array(); //el alt text de la imagen[i]
var titulo = new Array(); //titulo de la pagina[i]
var link = new Array(); //url de la pagina[i]
var extra = new Array(); //contenido extra de la pagina[i]

var posActual = 0; //posicion actual relativa a donde se empezo

var prefetcheado = new Array();
prefetcheado[-1] = prefetcheado[1] = 0;

var layoutDefault =
	'<div id="wcr_div" style="text-align:center">'+
		'<style id="wcr_style" type="text/css">#wcr_div button{float:none;}</style>'+
		'<img id="wcr_imagen"/><br/>' +
		'<div id="wcr_title"></div>' +
		'<div id="wcr_extra"></div>' +
		'<div id="wcr_botones">'+
			'<br/><div>'+
				'<a id="wcr_first" href="#">&lt;&lt; First</a> '+
				'<button id="wcr_btn-1">Back</button> '+
				'<button id="wcr_btn1">Next</button> '+
				'<a id="wcr_last" href="#">Last &gt;&gt;</a>'+
			'</div><br/>'+
			'<div><button id="wcr_btnaddbm" style="background-color:#0f0">Remember this page</button></div>'+
			'<div id="wcr_listabm"></div>'+
			'<div id="wcr_div_listabm_todos" style="display:none">'+
				'<br/><a id="wcr_toggle_bm" href="#toggleBms">See bookmarks for other sites</a>'+
				'<div id="wcr_listabm_todos" style="display:none"></div>'+
			'</div>'+
			'<div id="wcr_ultimavisita"></div><br/>'+
			'<div>'+
				'<button id="wcr_btnfit">Enable Fit-to-screen</button> '+
				'<button id="wcr_btnlayout">Use Original Layout</button> '+
				'<button id="wcr_btnslide">Start Slideshow</button> '+
				'<button id="wcr_btnsettings">Settings</button>'+
			'</div>'+
		'</div>'+
		'<div id="wcr_imagenes" style="display:none"></div>'+
		'<div id="wcr_links_imgs" style="display:none"></div>'+
	'</div>';

//en vez de reemplazar el body.innerHTML, meter el layoutdefault donde estaba la imagen y dejar el resto de la pagina intacta
function layoutIntacto(){
	//hago q los links a las pags anterior/sgte funcionen como los botones back/next
	if(confBool('overwrite_links', true)){
		try{
			var next = contenido(document.documentElement.innerHTML, getNext, 0);
			var linksNext = xpath('//*[@href="'+next+'"]', document, true);
			for(var i=0;i<linksNext.length;i++){
				linksNext[i].href = '#next';
				setEvt(linksNext[i], 'click', btnnext);
			}
		}catch(e){}
		try{
			var back = contenido(document.documentElement.innerHTML, getBack, 0);
			var linksBack = xpath('//*[@href="'+back+'"]', document, true);
			for(i=0;i<linksBack.length;i++){
				linksBack[i].href = '#back';
				setEvt(linksBack[i], 'click', btnback);
			}
		}catch(e){}
	}

	//reemplazo la imagen por el layout default
	var img;
	if(layoutElement) img = xpath(layoutElement);
	else{
		img = contenido(document.documentElement.innerHTML, getImagen, 0);
		var src = typeof(img)=='string' ? match(img, /src="(.+?)"/i, 1, img) : xpath('@src', img);
		try{ img = xpath('//img[@src="'+src+'"]'); }
		catch(e){ img = xpath('//img[@src="'+decodeURI(src)+'"]'); }
	}

	var padre = img.parentNode;
	var div = document.createElement('div');
	div.innerHTML = layoutDefault;
	padre.insertBefore(div, img);
	padre.removeChild(img);

	//si estoy dentro de un link, lo elimino
	while(padre){
		if(padre.href){
			while(padre.childNodes.length) padre.parentNode.insertBefore(padre.childNodes[0], padre);
			padre.parentNode.removeChild(padre);
			break;
		}
		else if(padre == document.body) break;
		padre = padre.parentNode;
	}

	get('wcr_btnlayout').innerHTML = 'Use Minimalistic Layout';
}

function layoutMinimo(){
	var elems = selCss('#AMRBar,#bookmarkData,#bookmarkPop,#navAMRav', document, true);
	if(elems.length){
		var keep = [];
		for(var i=0; i<elems.length; i++){
			var elem = elems[i];
			while(elem != document.body){
				keep.push(elem);
				elem = elem.parentNode;
			}
		}
		for(i=0; i<keep.length; i++){
			var padre = keep[i].parentNode;
			var k=0;
			for(var j=padre.childNodes.length; j; j--){
				var n = padre.childNodes[j-1];
				for(k=keep.length; k; k--) if(n==keep[k-1]) break;
				if(!k) padre.removeChild(n);
			}
		}
		var div = document.createElement('div');
		div.innerHTML = layoutDefault;
		document.body.appendChild(div);
	}
	else document.body.innerHTML = layoutDefault;
}

//[/regexp/, grupo], ['xpath'], o 'literal' para encontrar el contenido correspondiente
var getImagen = false;
var getBack = [/<a [^>]*href *= *"([^\"]+)"([^<]|<[^\/]|<\/[^a])*(back(?!ground)|prev)/i, 1];
var getNext = [/<a [^>]*href *= *"([^\"]+)"([^<]|<[^\/]|<\/[^a])*next/i, 1];
var getFirst = [/<a [^>]*href *= *"([^\"]+)"([^<]|<[^\/]|<\/[^a])*first/i, 1];
var getLast = [/<a [^>]*href *= *"([^\"]+)"([^<]|<[^\/]|<\/[^a])*(last|latest|newest|today)/i, 1];
var getExtras = false; //(opcional) arreglo de getters para meterlos al div extra
var bgColor = false, txtColor = false; //(opcionales) fuerza el color de fondo/texto
var funcionJs = false; //(opcional) ejecuta una funcion despues de mostrar una pagina
var scrollx = confVal('scrollx', 'L'); //para donde se autoscrollea la pagina (L/M/R de la imagen, o pixeles)
var scrolly = confVal('scrolly', 'U'); //idem (U/M/D)
var extraElement = false; //donde se pone el extra cuando se use el layout completo
var fixUrl = false; //f(url, origen (link/img)) q se aplica a los links y src de la imagen, para paginas raras (ej, en sinfest el link en el www apunta al no-www y el no-www redirige al www)
var layoutElement = null; //donde se pone todo cuando se usa el layout completo
var style = ''; //contenido de un <style/>
var onerr = function(url, img, num){
	if(num) return null;
	return {img: img};
}; //f(url de la pag, url de la img, num reintento (0..n)) retorna {url: pag alternativa, img: img alternativa} para reintentar despues de un error

//configuracion default del teclado
var teclado = defaultSettings.keyboardShortcuts;

//achicar o agrandar la imagen para calzar en pantalla
var fitSize = confBool('fit', defaultSettings.autozoom);
var achw = confBool('achw', defaultSettings.shrinkWidth), achh = confBool('achh', defaultSettings.shrinkHeight);
var agrw = confBool('agrw', defaultSettings.expandWidth), agrh = confBool('agrh', defaultSettings.expandHeight);

var maxScale = confVal('maxScale', 0) * 1;
var minScale = confVal('minScale', 0) * 1;
var maxScaleReset = confBool('maxScaleReset', false);
var minScaleReset = confBool('minScaleReset', false);

var bordex = confVal('bordex', defaultSettings.borderLR); //borde a los lados de la imagen
var bordey = confVal('bordey', defaultSettings.borderUD); //borde arriba y abajo

var scrollRate = parseInt(confVal('scroll_rate', 50)); //borde a los lados de la imagen
var dimScreen = confVal('dim', '0');

var colOK   = 'rgb(204, 238, 204)'; //verde
var colWait = 'rgb(238, 238, 238)'; //plomo
var colLoad = 'rgb(238, 238, 204)'; //amarillo
var colFail = 'rgb(238, 204, 204)'; //rojo

var cursores_custom = {
	'1': 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABYdJREFUWIXtll+IXFcdxz+/c86dO3dmJ7ubNsaG1FhZW7fVBpvY1BJ8ia0PrRWpSgNWpT4Ilap5EB+aB0EqvimKYKONVUFBaKiCUCwohtQKeailtQQTa9Jsmmx2Zje7szsze+89v58PM7PJJs0m/kMf8oPDmcM9/L6f8/uePwPX4lr8j8P/M5Mnd0386IbJDZ8aDevfk/fyVp7nM/8tsEvivR+dOPBi+3fWitP2TOtpu/vz2w/9J/KGq5k0cdeWJ7/1w29+fFttJ2rKu5JJet1OAmzMyJJIrIVaVquntRGwhvPWkCAZUMvqWb2yLjQoWG6dWni5OTd9GDg7zC1XEn/HbZv3Pv7sV77xic2fo7QcJ54TnWM8+dz3aMgYlSwQqp5qNSNkniQNVNMqPvGklZQkVAg+kK1PaZ2d5S9/OsJ3d//s9qJYeuWKAJs2b3rkC88+9NRn3/0o3WIJw4EozhzBJ9jKTMOs34OBcv6bGeI9o/VRgg/89uSv+fRNX7w3svz8mhaMj4/f98mf3PPUA+98iNOLU5gAppgKaoZcsXYr+vjgkMwI5ukVPby3JEYcoG8JkIVs+337dv7q/skHeXPxJJhhppgJZoaZoarIVVCYGSEJ1GOGiCcnX/X9LQDSiY98/4N/uP/Oj/nphTN9MeuXdihuMWIYqnLew1U/LjDHjCRJWK9jOBy5La8JcP09T9xxcNeuXbVme4YY44pwjAARi0ZUGBotCIhQxJx23qaIyzjnGUkaVEMGGEmssKgbcebI9fIA1Q99edvBnQ/uuGGhvYBaxNSIGlE1TBU17eua0S16nF08TbMzzUz3DPO9eYzB3jBQjHqos6lxIzdvvI2bdAuiQnm5Cuz4zNbnGruZfOHE70GFIAl1N0Lma5j2Pc+LnNluk7lOk/ZyG439fSA4vPfIRYcq15zXzx3ldDHF224Zo2GjdOLSQDZfBVBZd2t6V5F3KaxEVenEJeZikzKWxKhoqUSNWFQ0Gk48/eUORO2880MMEcHhCBKIUjJfzrGgi6sg3aBPDj3+ysP2WlVd4jAzxPqZBI/D45zgncMFj0sgJA5XEVxiuMSQYIjvN3OGyfBuGPJdjLcaIO/G7qHDe47uqczUkeD6fht4Z7gg+IonqXpCFZLM4+oQRjyh4QgjjsqIJ9Q9PhN8KrjE9aEETM6TXGzT0IICmDvXPXfg8KPHx+98esvXF9N5KAwRj0hEnMMEnAuoi3hzRAwkIAYaFYuCRaAUYqlo0R+H4PH4S1Z/IQBAD5htzp7d/+pj1fVbf/z2Ly2GWRTFe49LDPOgHtQZJY5k4JMZmDqsNKwEzQVfCrpsxFxxiZC6CiqGWyn6pQAAXWD2jRNvfLu6J9nwvn0bdre1hXpFKmDBYd5Q5/q7X9zQYEzBSkXLgBaG9owyNaQHFefIXErpFC9+TQADOkDrry//bW/4anLdtn0b723aNEVYJoY42GggYjgHblABFDQKrhC0AE1BlqFMhATHuFtH1+fMyvyaAEOIJcC9dvDIY9nXbv/pHT/YtOOkHQcP4h1ZSJloT9KcWyBWCtRHokQKKykoiCjRRcqkf3RTaiwkixQ+0tEeAjoUW+s1ccAocOPdj7z/l1u/s+6WY3YU7zyNrMap3aN/P/Kb1/cnWVJ1IWQhUA31UEsynyU1V5PMpz6TzGcuTdcltarPitN/bh1tHTv30szc9H6gyeVew0EosABM/XH/Sw9Xrv/AgZuf2LK55ZtcJ2O8Wdf52U7z53TQCxbiBk0u6of5ikF124Pxlf8R0bdpDMKtH967/Zl6LZUzr84fP/VC8xdTJ6b20T89w1wXXI2rxsMnMgLloK1MuppIgPFBS+lf5HPA7GBV/3JcLQD0K1GlX9I4gPi3xK/F/0X8A9KAi5v8bApEAAAAAElFTkSuQmCC',
	'2': 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABYRJREFUWIXtlVuMXWUVx39rfXufM9feZnoZ0URISWgVi1KkKg/GJvog4ihG5YHEoCnEBAMPPNUHE0WNL14SH9BYBR/qS4mamHhBIk21IoKpBLBja6RtJu3cZ86cfTn7+77lwz4zHc4gnZgSX7qS7+zvXPb6/771X2sfuBbX4v8ccjWSDA0N7R1729h43/W615eheOX3Z75wNfJuON7/+f0njs3+xGbDJTvZetre+bHdT2703qTn/Y7RrTtvG7lu0z5Smp0l38rbeRvIzFseg7RAWu0yW/ZZnjlclpNXRZ6lN6R7GLTN3DpwB9/84dc/8dD4I4+d+fOr928YIE0Hb/7S0Xv//o4DNzGyYxv5XIkPnsp3KDsloQoUZUFVenweKIocXwQ6uadlC4TK06oWiRZ43+YP8chPHzz06Ph3zp976cLXNgQQK79r/637+fCuu/DBs9hYxEKApsBgt1kU6p0gsrKvX32omM4ugilC5CM7xrn4+ORXHxv/2eTkhckjVwJQ5ywtqoIlP4+3wEwxRfCxK3TlMAMVQdRAlIVynrve/lnmHp/90ROf+uWl+fn5X71hBQA6dGiFFmaB2WIaX3lkAwRmhqoiIt1liChUwp177mb2B3O/OHbPUwdyn//1jQGspB0WiURms2mqquoBEMC6qpcvqoYgiHOrECB1RQrhzvd+3C1/v/3Mz+//4z4oz/x3gFiyHJaIEpkrZqiqDiAUPme5ahFjIHVNhhvDpK4BZhi22iBOQZwADudYBXHecfDgwYH2o/nx3x0++S5g5nUBvJW0QwtT4+zSBBOXXmKydZ62b6MISO21IGzu28z2/l2MDuxkx9AY/WlfLaigoogqqoJThwRBK8cdd98+Vk51jh//7vPvAYoegIQstPlXcZqWLPLMhd+Qt3NUlIZrvNZzjOXOMq3OBGcXTqNOGW4Os3VglG39ozTSRt0TKuQhox2X8VaBGsP3JHtun9/362efOPXBdRVYigsQPJZGEknqk4j02s7l8XOIGCpK4UsutSeZKi7i1KGJ4pySuATnEpxTVBQ6kU17+w8ADaDT8ySU1ROuntYAqX1e7cfX7IVEFVFQdagIqoLiELT+rXUnJVXs5b544vCL9wLpOgBZ899kYrWIM0QVcYY4ut7W3680nwokOETAiQMUQXBiYEIkkiQpjelBTj488XAe8hNAZ50FKxAOR5I4tE8QB5qCSxwkhrgaRp3DpC6RQxBRNDpcVMQUi6DmMAOXOgY7w/zli//+ykK+8CQwD1TrABQllaQuYVNIVHANRZuCJoI2DEkUSQTRFRsMMyFB0ahoUCQosRIIdc4ht4VTD1z83szc1BFgju4ErANw4mhqg0SVRr9SNRXtU5JU0D5BU0GTLoSutgxmRmKKRkGCIl6wjqBBGdYRXjw0ffTcq+e+3RXP12r2AAhDboB+bZAO1m2U9AmuKWijBpAUtLYZEYgYMRpiEQuRGALOO9Jmk1HZyfOHZn47cersl4FZIGPtMK0FEIhZLMj6cirt0GwMYNT+Jao4HA4l9SlpSHDm0OBwnZTRTZs4M/wKuS+xYCRBeKu8hRcemH/25eP/eLAr3u4V53IRUWB0+9ad943s3vLusVtGbixCnpZLVRbyWIbccstDWWUxq/KQ+7bPvKeI3udVXhU3ffSG+647unh9K88IMbBbbuTUQ0un/3Tkb58GzgOLQOwVXwsA0A9sAQapZ1S7n8cu+drrSjID9AOfu+3YzT/WW6ZtjpEwysRhf+EP33ruk8DZrnh4PXEAt2bvqbtzGWh1b1xYsxaBpZ7VAjo2r2n7uebIwMT25tRTPnv6Gy98BuI/ryTeW4H/NVJgG7CV+vFaUs/56qy/2QArEA3qikbqSvqrlPtavLnxH1JHdHLMfy8nAAAAAElFTkSuQmCC',
	'3': confVal('cursor_custom_3', false),
	'4': confVal('cursor_custom_4', false),
	'5': 'iVBORw0KGgoAAAANSUhEUgAAABsAAAApCAYAAADEZlLzAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAC10lEQVRYR+2V7UvTURTHfWYqCP5dvRYsytJCdFagWRkOLU1dayaJNSHRVJYltnQ+Zj7NhyJxYWaZ+ZtmtuWeik2de/52z019kQYzN1/9Dhzuiwv3c7/fc869UVFiiA6IDogOiA6IDogORKWkpODYbIiJiSHYsQHhdDqPBxgdHY3t7W1sbm5GHkiwra0tDqRITU2NnKUEW19f5yCj0Qiz2YzExMTIAAlGIQgCX4PBYORqSDC/388hXq8Xdrudq6PY6dTwTQbB6HBKAhLY4/EgEAhweFjHYtdGUmK1WnlXWiwWuN1uOBwODpZIJOGpIcHoYJPJxFcKUkeKkpOT+RobGxs2hXC5XDzj4+N5zUhNpDoSPp9vrxkSEhL2RuFI9ZqzuNA3a0Dve8NeDQ6wiNeNhvy/unFqxY0bqm6cLFZB1jQKqfIFTlyuw231O5CSv3s7Li6OqyXgodT1f3TgTEkzrjwcQmZVB/LrRyHXCsi9P46MiiGUNOoP6jRsbGzwTEpKCq0TlzzAVdUgLtzpZgdrUNT6GsMWYOIXoOhdQXbNBNKuq6FsGdx34O5IEDCkP29Y8OB0aRukNa9Q0DAJzZIb9Cg9X3LiXHU7zrJLZFd1Iudm/YHqbDZb6L/BA+08sso1yL07gDdMzQoDzbOcDQA6uws69ipN24A5K9tzYh9wR1FoNipaJpEn70HpYz3mXMBXBvrG8gvLNZbfWRq8wA96PYL7YYd6FDWTAi5VMmWVWlQ+0WPa/gfQODaDDFkdCpUDKK4dQVH1Uwzol0NT8K8bCD+Bi+VqSBlQquhCmVqHD+yPJKCyfQanCtXIu9WJIkXL0UB0AcHsx7ORReTf60R6cTPOM2B1vwGPpqyQtc4gq6obORVtePvJdHQYARctQTQNLqCgrh9pslakl3UgQ65FprwL1xp0aHw5Hx7Qrr1GNm8Tyz40j6+htu8zansW0DS2ivHV4KFAvwES0XcvxVHSmgAAAABJRU5ErkJggg==',
	'6': 'iVBORw0KGgoAAAANSUhEUgAAACUAAAApCAYAAACyXOB4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAC5klEQVRYR+2W2U9TQRSH2cOSkPB3+UyCRlHQEBY1AVExNKAgUGuRSFBIJCCQihKsUFaRrSwaCTWIKCK3VMRWumlaoHSh/TlnpI0S4hPt5eGe5GQe55tvzjkzUVFSSAYkA5IByYBkQDIgGZAMiGogNTUVogIctnlMTAxBHTswOJ3O4wUWHR2N3d1dbG9vHx8wgtrZ2eFgFGlpaeJfJUFtbm5yIKPRCLPZjKSkJHHBCIpCEAS+BgIB8WuMoPb29jiM1+uF3W7ntij2OzPyE4OgCIKSwAjQ4/HA7/dzSFHGRfD6yIzVauVdaLFY4Ha74XA4OGBiYmJka4ygCMBkMvGVgmyRoZSUFL7GxsZG3BhcLhfP+Ph4XlNkR+wOhM/nCxV1QkJCaESIUk/UVodcDa8rGqb/676B93oMLuixaHEdfb2RmYM9HxcXx+0R2EFbt1XvcOJyA/KVLyBrncDJ0kbcaOzDrMF99HAHwLC1tcUzOTk5tFlZiw6ZVaPIuz8FuUZAYdMEsmq6ceXhKM6UtWHooyO8YMFRQWD051K2jyD9ugo5ddNQDBgw/QsYswAlHa8ZqBoX7vThauMIVj0IKxhsNlvo95B7swk5NT04yzY/V9uF56tO0MOkXnWjqHkG+XWvcLq8E2OCJ6xQUfu/UhicwKIVmLMBWvYCae0uLPiBJQZlYPmGWcu7O4zsSjUeaJbCCxWsM2sA+ME213uB72zdYPmF5TeWX1kuuoDyxzoUyPuhaJ+JDNSwbg0ltU9RWj+OYuUwMmUNaJmc54BzdqD6iQ551RpcqlZDPSNEBoqMlSjaUXCrB6eKVVB2/QH6wP6FFSot8hW9yGdAFytVEH6Gt9D/mRJvP5mQW9WJ7Jo+yDrm8WjWitohPc4zoIzSNhTe68Gz8RUIZv5uRi5aXi7hWrMWWfJeZMo1yKjoRrqsA0UNQ2gdWcaKJRBZoODRp9YDaJ1cR33/MuoHP6NtagPTaz4Y/5pPvwHk5XcvVBI4VwAAAABJRU5ErkJggg=='
};
var ultimoevt = null; //para acordarme en q mitad de la img estaba parado el cursor la ultima vez
var listabm = [];
var listabmTodos = null;
var elemImagen = null;
var slider = 0; // = setInterval(slideshow, secs);
var flipControls = false; //invertir flechas/clicks/botones para mangas u otros q se lean al reves

function run_script(){
	try{
		if(useHistoryAPI && history.pushState){
			setEvt(window, 'popstate', function(evt){
				if(evt.state && evt.state.wcr_url){
					var dir = evt.state.wcr_pos - posActual;
					if(dir*dir == 1) cambiaPag(dir, true);
					else redirect(evt.state.wcr_url);
				}
			});
		}

		var p = getConfPagina();
		if(p){ //si esta deshabilitada esta pag p===null, si no es siempre un objeto
			link[0] = document.location.href;
			listabm = getListaBookmarks();
			if(goToBookmark && listabm.length == 1 && listabm[0]['url'].split('#')[0] != link[0].split('#')[0] &&
				confirm('Go to last saved page?\n'+
					listabm[0]['title']+'\n'+
					listabm[0]['url']+
					'\n\n(This confirmation dialog can be disabled in the script settings)')){
				redirect(listabm[0]['url']);
				return;
			}
			listabmTodos = getListaBookmarksTodos();

			if(p.img) getImagen = typeof(p.img) == 'string' ?
				['//img[starts-with(@src,"'+p.img.replace(/\|/g, '") or starts-with(@src,"')+'")]'] : p.img;
			if(p.back) getBack = typeof(p.back) == 'string' ? ['//a['+p.back+']/@href'] : p.back;
			if(p.next) getNext = typeof(p.next) == 'string' ? ['//a['+p.next+']/@href'] : p.next;
			if(p.first) getFirst = typeof(p.first) == 'string' ? ['//a['+p.first+']/@href'] : p.first;
			if(p.last) getLast = typeof(p.last) == 'string' ? ['//a['+p.last+']/@href'] : p.last;
			if(p.extra) getExtras = p.extra;
			if(p.bgcol) bgColor = p.bgcol;
			if(p.txtcol) txtColor = p.txtcol;
			if(p.js) funcionJs = p.js;
			if(p.scrollx) scrollx = confVal('scrollx', scrollx, p.scrollx);
			if(p.scrolly) scrolly = confVal('scrolly', scrolly, p.scrolly);
			if(p.xelem) extraElement = p.xelem;
			if(p.layout !== undefined) keepLayout = confKeepLayout(keepLayout, p.layout);
			if(p.fixurl) fixUrl = p.fixurl;
			if(p.layelem) layoutElement = p.layelem;
			if(p.style) style = p.style;
			if(p.onerr) onerr = p.onerr;

			if(!getImagen){
				//si no tenia conf especial, tratar de reconocer automaticamente la imagen...
				var next, back, html = document.documentElement.innerHTML;
				try{next = contenido(html, getNext, 0);}catch(e){}
				try{back = contenido(html, getBack, 0);}catch(e){}

				if(next || back){
					var subs = ["", "/comics/", "/comic/", "/strips/", "/strip/", "/archives/", "/archive/", "/wp-content/uploads/", "comics", "comic", "strips", "strip", "archives", "archive", "/manga/"];
					for(var s = 0; s < subs.length; s++){
						var query = '//img[contains(@src, "'+subs[s]+'")]';
						try{
							var imgs = xpath(query, html, true);
							if(imgs && imgs.length == 1){
								getImagen = [query];
								break;
							}
						}catch(e){}
					}
				}
			}

			if(getImagen) iniciar();
			else{
				if(defaultSettings.showSettingsOnFail) mostrarSettings();
				else error('no settings found for this site');
			}
			
			if(GM_registerMenuCommand){
				GM_registerMenuCommand('Webcomic Reader - Disable for this site', function(){
					if(confirm('Are you sure you want to disable Webcomic Reader on this site?\n'+
						'(It can be re-enabled later with this menu)')){
						setData('confpag', 'dis');
						redirect(link[posActual]);
					}
				});
			}
		}
		else if(GM_registerMenuCommand){
			GM_registerMenuCommand('Webcomic Reader - Enable for this site', function(){
				delData('confpag');
				redirect(link[posActual]);
			});
		}
	}catch(e){ error('loadpag: '+e); }
}

//setear el html nuevo y rellenarlo con los datos de la pag actual, aparte de prefetchear la de adelante y atras
function iniciar(){
	try{
		if(firstRun && confirm(
			'This seems to be your first time using Webcomic Reader. '+
			'Do you want to look at the settings?\n'+
			'(You can change them at any time with the settings button or the option in the Greasemonkey menu)'))
			mostrarSettings();

		setear(document.documentElement.innerHTML, 0, 0); //seteo el contenido de la pag inicial
		if(imagen[0] == null) return;

		try{ var first = getLink(document.documentElement.innerHTML, getFirst, 0); }
		catch(e){ error('first: '+e); }
		try{ var last = getLink(document.documentElement.innerHTML, getLast, 0); }
		catch(e){ error('last: '+e); }

		if(keepLayout) layoutIntacto();
		else layoutMinimo();

		var sombrear = dimScreen=='I' ? 'wcr_imagen' : (dimScreen=='S' ? 'wcr_div' : '');
		if(sombrear){
			var sombra = document.createElement('div');
			sombra.setAttribute('style', 'opacity:0.8; position:fixed; z-index:2322; background:#000; top:0; left:0; right:0; bottom:0; pointer-events:none;');
			var sombreado = get(sombrear);
			sombreado.style.position = 'relative';
			sombreado.style.zIndex = '2323';
			sombreado.parentNode.insertBefore(sombra, sombreado);
		}

		if(!showButtons) get('wcr_botones').style.display = 'none';

		//dejar de usar scroll* para el borde, usar borde*
		if(typeof(scrollx)=='number' && scrollx){
			bordex = scrollx<0 ? -scrollx : scrollx;
			scrollx = scrollx<0 ? 'R' : 'L';
		}
		if(typeof(scrolly)=='number' && scrolly){
			bordey = scrolly<0 ? -scrolly : scrolly;
			scrolly = scrolly<0 ? 'D' : 'U';
		}

		if(scrollx == 'R' && confBool('flipControlsManga', false)){
			flipControls = true;
		}

		elemImagen = get('wcr_imagen');

		if(bordex){
			elemImagen.style.paddingLeft =
			elemImagen.style.paddingRight = bordex + 'px';
		}
		if(bordey){
			get('wcr_div').style.paddingBottom =
			get('wcr_div').style.paddingTop = bordey + 'px';
		}

		if(first) get('wcr_first').href = first;
		else get('wcr_first').style.visibility = 'hidden';
		if(last) get('wcr_last').href = last;
		else get('wcr_last').style.visibility = 'hidden';

		if(bgColor){
			get('wcr_div').style.backgroundImage = 'none';
			get('wcr_div').style.backgroundColor = bgColor;
		}
		if(txtColor) get('wcr_div').style.color = txtColor;

		if(style) get('wcr_style').innerHTML += style;

		if(fitSize) get('wcr_btnfit').innerHTML = 'Disable Fit-to-screen';

		for(var i=0;i<listabm.length;i++) addLista(listabm[i]);
		if(listabmTodos){
			var html = '<table align="center">';
			for(var sitio in listabmTodos){
				var lista = listabmTodos[sitio];
				html+='<tr><td rowspan="'+lista.length+'">'+sitio+'</td>';
				for(i=0; i<lista.length; i++){
					if(i) html+='<tr>';
					html+='<td><a href="'+lista[i].url+'" title="'+lista[i].url+'">'+lista[i].title+'</a></td></tr>';
				}
			}
			html+='</table>';
			get('wcr_listabm_todos').innerHTML = html;

			setEvt('wcr_toggle_bm', 'click', function(e){
				var lista = get('wcr_listabm_todos');
				lista.style.display = lista.style.display == 'none' ? '' : 'none';
				e.stopPropagation();
				e.preventDefault();
			});
			get('wcr_div_listabm_todos').style.display = '';
		}

		getUltima();

		teclado = getTeclas();

		setEvt(window, 'keydown', teclaHandler);
		setEvt(window, 'resize', fitImagen);
		setEvt('wcr_btn1', 'click', btnnext);
		setEvt('wcr_btn-1', 'click', btnback);
		setEvt(elemImagen, 'click', imgClick);
		setEvt(elemImagen, 'mousemove', imgCursor);
		setEvt(elemImagen, 'load', function(){
			fitImagen(); 
			scrollear();
		});
		setEvt('wcr_btnaddbm', 'click', addBookmark);
		setEvt('wcr_btnfit', 'click', toggleConfFit);
		setEvt('wcr_btnlayout', 'click', toggleConfKeepLayout);
		setEvt('wcr_btnslide', 'click', slideshow);
		setEvt('wcr_btnsettings', 'click', mostrarSettings);
		//setEvt(window, 'touchstart', touchstart);
		//setEvt(window, 'touchend', touchend);

		var imgelem = document.createElement('img');
		imgelem.id = 'wcr_imagen0';
		imgelem.src = imagen[0];
		get('wcr_imagenes').appendChild(imgelem);

		agregarLink(0);

		cambiaPag(0);
		prefetch(1, 1, prefetchSizeStart[1]);
		if(link[1] || prefetchNoNext){
			prefetch(-1, -1, prefetchSizeStart[0]);
		}
		else{
			disableBtn(-1, false);
			setCol(-1, colOK);
			imagen[-1] = null;
		}
	} catch(e){
		error('init: '+e);
		if(defaultSettings.showSettingsOnFail) mostrarSettings();
	}
}

//setea la imagen y el link como vars globales para actualizar
function setear(html, pos, dir){
	try{
		var pag = document.createElement('div');
		pag.innerHTML = html;

		var img = contenido(pag, getImagen, pos);
		var src;
		if(typeof(img)=='object'){
			src = xpath('@src', img); //img.src absolutiza la url basandose en la pag inicial
			imgTitle[pos] = img.title;
		}
		else{//getImagen es regexp q retorna el elemento <img .../> o directamente su url
			src = match(img, /src *= *"(.+?)"/i, 1, img);
			imgTitle[pos] = match(img, /title *= *"(.+?)"/i, 1, null);
		}
		if(fixUrl) src = fixUrl(src, true, false, pos);
		imagen[pos] = absUrl(src, pos);

		if(pos){
			var poslink = pos+dir;
			try{ link[poslink] = getLink(pag, dir > 0 ? getNext : getBack, pos); }
			catch(e){
				link[poslink] = null;
				error('set['+pos+']/link['+poslink+']: '+e);
			}
		}
		else{
			try{ link[1] = getLink(pag, getNext, pos); }
			catch(e){
				link[1] = null;
				error('set['+pos+']/link[1]: '+e);
			}
			try{ link[-1] = getLink(pag, getBack, pos); }
			catch(e){
				link[-1] = null;
				error('set['+pos+']/link[-1]: '+e);
			}
		}

		try{ titulo[pos] = xpath('//title', pag).innerHTML; }
		catch(ex){
			try{ titulo[pos] = match(html, /<title>(.+?)<\/title>/i, 1); }
			catch(e){
				error('set['+pos+']/titulo: '+e);
				titulo[pos] = link[pos];
			}
		}

		extra[pos] = '';
		if(getExtras){
			for(var i=0;i<getExtras.length;i++){
				try{
					var x = contenido(pag, getExtras[i], pos);
					if(typeof(x)=='object') x = outerHTML(x);
					extra[pos] += x;
				}catch(e){error('set['+pos+']/extras['+i+']: '+e);}
			}
		}
		
		if(dir) get('wcr_btn'+dir).innerHTML = (dir>0?'Next':'Back')+' ('+((pos-posActual)*dir)+(link[pos+dir]?'':'!')+')';
	}
	catch(e){
		error('set['+pos+']: '+e);
		imagen[pos] = null;
		if(dir){
			get('wcr_btn'+dir).innerHTML = (dir>0?'Next':'Back')+' ('+((pos-posActual)*dir-1)+'...)';
			if((pos-posActual)*dir == 1) get('wcr_btn'+dir).title = link[pos] + ' (image not found)';
		}
	}
}

//saca el link, y si me llega un <a> le saco el href
function getLink(pag, getter, pos){
	var linkpag = contenido(pag, getter, pos);
	if(linkpag && typeof(linkpag)=='object' && !linkpag.href) //array[url, postdata]
		return linkpag;
	if(linkpag && linkpag.href) //<a href=...>...<a/>
		linkpag = linkpag.href;

	if(fixUrl) linkpag = fixUrl(linkpag, false, true, pos);
	linkpag = absUrl(linkpag, pos);
	if(linkpag == link[pos]) return null;
	return linkpag;
}

//convierte un url relativo en absoluto basandose en el url de una posicion
function absUrl(url, pos){
	if(!url.indexOf('javascript:')) return null;

	url = decodeURI(url.replace(/(^|[^#])#([^#].*|$)/, '$1').replace(/^\.\//, '').replace(/&amp;/g,'&')).trim();

	if(!url) return null;
	if(!url.match(/^\w+:/)){ //path relativo
		var base = link[pos];
		try{ base = xpath('//base/@href'); }
		catch(e){}

		if(url.indexOf('/') == 0){
			if(url.indexOf('//') == 0) url = base.match(/^\w+:/) + url;
			else url = base.match(/^\w+:\/\/[^\/]+/) + url;
		}
		else if(url.indexOf('##') == 0)
			url = base.split('##')[0] + url;
		else{
			var ipars = base.indexOf('?');
			if(ipars < 0) ipars = base.length;
			if(url[0] == '?') return base.substr(0, ipars) + url;
			base = base.substr(0, base.lastIndexOf('/', ipars));
			while(url.indexOf('../') == 0){
				url = url.substr(3);
				if(!base.match(/:\/\/[^\/]+$/)) base = base.substr(0, base.lastIndexOf('/'));
			}
			url = base + '/' + url;
		}
	}
	return url;
}

//muestra la imagen q viene en esta direccion y prefetchea el link futuro
function cambiaPag(dir, poppedState, slidden){
	try{
		if(dir && imagenOK[posActual+dir]===undefined && imagen[posActual+dir]!==null &&
			(!moveWhileLoading || imagen[posActual+dir]===undefined)) return;
		if(imagen[posActual+dir]===null && link[posActual+dir] || imagenOK[posActual+dir]===false){
			redirect(link[posActual+dir]);
			return;
		}
		posActual+=dir;

		//seteo el contenido actual
		document.title = titulo[posActual];
		if(imagen64[posActual]) get('wcr_imagen').src = imagen64[posActual];
		else get('wcr_imagen').src = imagen[posActual];
		get('wcr_imagen').title = imgTitle[posActual];

		if(get('wcr_title')) get('wcr_title').innerHTML = imgTitle[posActual];
		get('wcr_btnaddbm').title = link[posActual];
		get('wcr_btn1').title = link[posActual + 1] + (imagen[posActual + 1] === null ? ' (image not found)' : '');
		get('wcr_btn-1').title = link[posActual - 1] + (imagen[posActual - 1] === null ? ' (image not found)' : '');

		var xel = get('wcr_extra');
		if(keepLayout && extraElement){
			try{ xel = xpath(extraElement); }
			catch(e){ error('extraElement: ' + e); }
		}
		if(xel) xel.innerHTML = extra[posActual];

		var maxok;
		for(maxok=posActual; imagen[maxok+1]; maxok++) continue;
		get('wcr_btn1').innerHTML = 'Next ('+(maxok-posActual)+(link[maxok+1]?(imagen[maxok+1]===null?'...':''):'!')+')';
		for(maxok=posActual; imagen[maxok-1]; maxok--) continue;
		get('wcr_btn-1').innerHTML = 'Back ('+(posActual-maxok)+(link[maxok-1]?(imagen[maxok-1]===null?'...':''):'!')+')';

		if(useHistoryAPI && history.pushState && !poppedState){
			if(dir) history.pushState(
				{wcr_url: link[posActual], wcr_pos: posActual},
				titulo[posActual],
				link[posActual]);
			else history.replaceState(
				{wcr_url: link[posActual], wcr_pos: posActual},
				titulo[posActual],
				link[posActual]);
		}

		try{ if(funcionJs) funcionJs(dir); }
		catch(e){ error('js('+dir+'): '+e); }

		saveUltima();
		setCursores();

		if(slider && !slidden) slideshow();

		if(dir){
			var pd = posActual+dir;

			//(des)habilito los botones segun corresponda
			setCol(-dir, colOK);
			if(!get('wcr_imagen'+pd) && imagen[pd]!==null) disableBtn(dir, true);
			disableBtn(-dir, false);

			var posAtras = posActual-dir*(maximgs[-dir]+1);
			var atras = get('wcr_imagen'+posAtras);
			if(atras){
				atras.parentNode.removeChild(atras);
				imagen64[posAtras] = null;
			}
			var adelante = posActual+dir*maximgs[dir];
			if(imagen[adelante] && !get('wcr_imagen'+adelante)){
				cargarImagen(adelante);
			}

			//prefetcheo la pag q viene en esta direccion
			prefetch(dir, pd, prefetchSize[dir>0?1:0]);
		}
	} catch(e){ error('cambia['+dir+']: '+e); }
}

//si la conf lo pide, ajustar la imagen al tamaño de la ventana
function fitImagen(reintentando){
	var size = winsize();
	var wihi = imgsize();
	var wi = wihi.wi, hi = wihi.hi;
	var ww = size.w - 2*bordex;
	var hw = size.h - 2*bordey;

	if(fitSize){
		if(!achw && !agrw && !achh && !agrh){
			achw = achh = true;
			scrollear();
			mostrarSettingsZoom();
		}

		if(achw && wi>ww || agrw && wi<ww){
			hi = hi*ww/wi;
			wi = ww;
		}
		if(achh && hi>hw || agrh && hi<hw){
			wi = wi*hw/hi;
			hi = hw;
			if(achw && wi>ww){
				hi = hi*ww/wi;
				wi = ww;
			}
		}

		var scale = wi/wihi.wi * 100;
		if(maxScale && scale > maxScale){
			if(maxScaleReset){
				wi = wihi.wi;
				hi = wihi.hi;
			}
			else{
				wi = wihi.wi*maxScale/100;
				hi = wihi.hi*maxScale/100;
			}
		}
		else if(minScale && scale < minScale){
			if(minScaleReset){
				wi = wihi.wi;
				hi = wihi.hi;
			}
			else{
				wi = wihi.wi*minScale/100;
				hi = wihi.hi*minScale/100;
			}
		}
	}
	if(wi && hi){
		cambiarPorte(wi, hi);
		//para ver si (des)aparecen las scrollbars y hay q recalcular
		//"reintentando" para evitar posibles loops infinitos
		if(!reintentando && size.p!=winsize().p) fitImagen(true); 
	}
	else get('wcr_imagen').setAttribute('style', '');
}

//obtiene el porte original de la imagen
function imgsize(){
	var img = get('wcr_imagen');
	if(img.naturalWidth) return {wi: img.naturalWidth, hi: img.naturalHeight};

	img = get('wcr_imagen'+posActual);
	return img ? {wi: img.width, hi: img.height} : {wi:0, hi:0};
}

//cambia el porte de la imagen por css
function cambiarPorte(wi, hi){
	get('wcr_imagen').style.width = wi+'px';
	get('wcr_imagen').style.height = hi+'px';
}

//scrollea al punto inicial de la imagen
function scrollear(){
	var left = 0;
	var top = 0;
	var img = elemImagen;
	var offset = img;
	while(offset){
		left += offset.offsetLeft;
		top += offset.offsetTop;
		offset = offset.offsetParent;
	}
	var size = winsize();

	var x = scrollx;
	if(x == 'L') x = left;
	else if(x == 'R') x = left + img.offsetWidth - size.w;
	else if(x == 'M') x = left + (img.offsetWidth - size.w)/2;
	else if(typeof(x) == 'function') x = x();

	var y = scrolly;
	if(y == 'U') y = top - bordey;
	else if(y == 'D') y = top + img.offsetHeight - size.h + bordey;
	else if(y == 'M') y = top + (img.offsetHeight - size.h)/2;
	else if(typeof(y) == 'function') y = y();

	scroll(x, y);
}

//calcula el porte de la ventana sin contar scrollbars
function winsize(){
	var div = document.createElement('div');
	div.style.width = div.style.height = '100%';
	div.style.left = div.style.top = '0';
	div.style.position = 'fixed';
	document.body.appendChild(div);
	var s = {w: div.clientWidth, h: div.clientHeight};
	s.p = s.w*1000+s.h;
	document.body.removeChild(div);
	return s;
}

//avanza solo las paginas cada cierto tiempo
function slideshow(){
	if(slider){
		clearInterval(slider);
		slider = 0;
		get('wcr_btnslide').innerHTML = 'Start Slideshow';
	}
	else{
		var secs = Number(prompt('Enter the number of seconds for turning a page (enter a negative number to advance backwards)\n\n'+
			'Press the slideshow button, the ESC key or manually turn pages to stop', 10));
		if(secs){
			var dir = secs > 0 ? 1 : -1;
			secs *= dir*1000;
			slider = setInterval(function(){cambiaPag(dir, false, true);}, secs);
			get('wcr_btnslide').innerHTML = 'Stop Slideshow';
		}
	}
}

//prefetchea la pagina q viene en la direccion dir (+/-1)
function prefetch(dir, pos, prof, reintento){
	if(dir*pos<0 || !prof) return; //si estoy tratando de prefetchear el lado del q vengo, o si ya termine de profundizar

	var esSgte = pos==posActual+dir;
	if(!link[pos]){ //link null o a si mismo, cuenta como fail
		if(!esSgte) return; //si no es el siguiente el fallado, no faileo el boton
		setCol(dir, colFail);
		disableBtn(dir, true);
		return;
	}

	//ya pase por aca
	if(pos*dir <= prefetcheado[dir]*dir && !reintento) return prefetch(dir, pos+dir, prof-1);
	prefetcheado[dir] = pos;

	setCol(dir, colWait); //boton gris mientras no ha loadeado
	if(esSgte) disableBtn(dir, true); //y si estoy loadeando el sgte, lo deshabilito

	var url = link[pos];
	var meth = 'GET';
	var pars = null;
	if(typeof(url)=='object'){
		pars = url[1];
		url = url[0];
		meth = 'POST';
	}

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				try{
					setear(xmlhttp.responseText, pos, dir);

					if(!esSgte || !imagen[pos]) disableBtn(dir, false);
					//si el otro estaba rojo no lo habilito
					disableBtn(-dir, get('wcr_btn'+(-dir)).style.backgroundColor == colFail);

					if(imagen[pos]){
						agregarLink(pos);

						setCol(dir, colLoad); //boton amarillo mientras prefetchea

						cargarImagen(pos, dir, prof, reintento);
					}
					else setCol(dir, colOK);
				} catch(e){ error('pre['+pos+']: '+e); }
			}
			else{
				prefetcheado[dir] = pos-dir; //hago q pase de nuevo por aca
				if(esSgte){
					disableBtn(dir, true);
					disableBtn(-dir, get('wcr_btn'+(-dir)).style.backgroundColor == colFail);
					setCol(dir, colFail);
				}
				error('pre['+pos+']: status '+xmlhttp.status+' ('+url+(pars?' ; '+pars:'')+')');
			}
			setCursores();
		}
	};
	try{
		xmlhttp.open(meth, url, true);
		try{
			var enc = xpath('//meta/@content');
			xmlhttp.overrideMimeType(enc);
		}catch(e){}
		if(pars){
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.setRequestHeader("Content-length", pars.length);
			xmlhttp.setRequestHeader("Connection", "close");
		}
		xmlhttp.send(pars);
	}
	catch(e){
		if(e.toString().indexOf('Component returned failure code: 0x805e000a') > -1)
			alert('Error when trying to load '+url+'\nIf you\'re using AdBlock Plus, NoScript or some other extension that might be blocking the request, temporarily disable it (or whitelist this page) and try again');
		error('ajax '+url+(pars?' ; '+pars:'')+': '+e);
	}
}

function cargarImagen(pos, dir, prof, reintento){
	var img = document.createElement('img');
	img.id = 'wcr_imagen'+pos;
	get('wcr_imagenes').appendChild(img);

	function loadOK(){
		if(!dir) return;
		imagenOK[pos] = true;
		setCursores();
		setCol(dir, colOK);
		prefetch(dir, pos+dir, prof-1);
	}
	function loadFail(){
		if(onerr){
			reintento = reintento || 0;
			var nueva = onerr(link[pos], imagen[pos], reintento, pos);
			error('loadFail('+pos+','+dir+','+prof+','+reintento+') - load: '+JSON.stringify(nueva));
			if(nueva){
				if(nueva.img){
					imagen[pos] = nueva.img;
					cargarImagen(pos, dir, prof, reintento+1);
				}
				else{
					link[pos] = nueva.url;
					prefetch(dir, pos, prof, reintento+1);
				}
				return;
			}
		}
		if(!dir) return;
		imagenOK[pos] = false;
		setCursores();
		setCol(dir, colFail);
	}

	if(usarb64 && GM_xmlhttpRequest){
		setTimeout(function() {
			GM_xmlhttpRequest({
				method: 'GET',
				url: imagen[pos],
				overrideMimeType: 'text/plain; charset=x-user-defined',
				onload: function(resp) {
					imagen64[pos] = 'data:'+
						resp.responseHeaders.match(/Content-Type: (.*)/i)[1]+
						';base64,'+btoa(resp.responseText.replace(/[\u0100-\uffff]/g, function(c) {
							return String.fromCharCode(c.charCodeAt(0) & 0xff);
						}));
					loadOK();
				},
				onerror: loadFail,
				onabort: loadFail
			});
		}, 0);
		return;
	}

	img.src = imagen[pos];

	//ok, boton verde
	setEvt(img, 'load' , loadOK);
	//nok, boton rojo
	setEvt(img, 'error', loadFail);
	setEvt(img, 'abort', loadFail);
}

//agrega un link a la imagen cargada para usarlo con DownThemAll
function agregarLink(pos){
	var linkimg = document.createElement('a');
	linkimg.href = imagen[pos];
	linkimg.textContent = 'wcrimg ' + pos + ' - ' + imagen[pos].match(/\/([^\/]+$)/)[1];
	var cont = get('wcr_links_imgs');
	if(pos<0) cont.insertBefore(linkimg, cont.firstChild);
	else cont.appendChild(linkimg);
}

//getElementById
function get(id){
	return document.getElementById(id);
}

//agrega la funcion fun al evento evt del elemento get(id)
function setEvt(elem, evt, fun){
	if(typeof(elem) == 'string') elem = get(elem);
	if(!elem) return;
	if(isArray(elem)) for(var i=0; i<elem.length; i++) setEvt(elem[i], evt, fun);
	else if(isArray(evt)) for(i=0; i<evt.length; i++) setEvt(elem, evt[i], fun);
	else elem.addEventListener(evt, fun, true);
}

//dice si el objeto es un array (o nodelist, lo q retorna querySelectorAll)
function isArray(o){
	return '[object Array];[object NodeList]'.indexOf(Object.prototype.toString.call(o)) >= 0;
}

//si puede retorna s.match(re)[g], si no puede y se paso def, retorna def, y si no tira una excepcion
function match(s, re, g, def){
	var r = s.match(re);
	if(r && r.length > g) return r[g];
	if(def!==undefined) return def;
	throw 'match: '+re+'['+g+']';
}

//evalua una query xpath sobre un elemento (o su html), si se pide explicitamente se devuelve el arreglo de resultados, si no el primero q encuentre
function xpath(query, elem, arreglo){
	if(!elem) elem = document;
	if(!isFirefox() && elem!=document && query.charAt(0)!='.')
		query = (query.charAt(0)=='/' ? '.' : './') + query;

	if(typeof(elem)=='string'){
		var div = document.createElement('div');
		div.innerHTML = elem;
		elem = div;
	}
	var res = document.evaluate(query, elem, null, arreglo ? XPathResult.ORDERED_NODE_SNAPSHOT_TYPE : XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(arreglo && !res.snapshotLength || !arreglo && !res.singleNodeValue) throw 'xpath: '+query;

	if(!arreglo){
		res = res.singleNodeValue;
		//si es un atributo retorno el valor, si no retorno el nodo
		if(query.match(/@\w+$/)) return res.value;
		return res;
	}

	var arr = new Array();
	for (i = 0; i < res.snapshotLength; i++) arr.push(res.snapshotItem(i));
	return arr;
}

//evalua una query css sobre un elemento (o su html), si se pide explicitamente se devuelve el arreglo de resultados, si no el primero q encuentre
function selCss(query, elem, arreglo){
	if(!elem) elem = document;
	if(typeof(elem)=='string'){
		var div = document.createElement('div');
		div.innerHTML = elem;
		elem = div;
	}

	if(arreglo) return elem.querySelectorAll(query);
	var resp = elem.querySelector(query);
	if(resp === null) throw 'selcss: '+query;
	return resp;
}

//busca el contenido definido por el getter dentro del elemento elem
//el getter puede ser 'literal', [/regexp/, numgrupo], ['xpath q retorna arreglo', 'pegamento'], o ['xpath']
function contenido(elem, getter, pos){
	//'texto plano'
	if(typeof(getter)=='string') return getter;

	//function((string)elem, pos)
	if(typeof(getter)=='function'){
		if(typeof(elem)!='string') elem = elem.innerHTML;
		return getter(elem, pos);
	}

	//[/regexp/, grupo]
	if(typeof(getter[0])!='string' && !isArray(getter[0])){
		if(typeof(elem)!='string') elem = elem.innerHTML;
		return match(elem, getter[0], getter[1]);
	}

	var arr;

	//[['query css', etc?]]
	if(typeof(getter[0])!='string'){
		getter = getter[0];
		arr = selCss(getter[0], elem, getter.length > 1);
	}
	//['query xpath', etc?]
	else arr = xpath(getter[0], elem, getter.length > 1);

	//['query']
	if(getter.length == 1) return arr;

	//['query q retorna un arreglo', 'string entre los elementos del arreglo', idx inicio?, idx fin?]
	var inicio = getter.length > 2 ? getter[2] : 0;
	if(inicio < 0) inicio += arr.length;
	if(inicio < 0) inicio = 0;
	var fin = getter.length > 3 ? getter[3] : arr.length;
	if(fin < 0) fin += arr.length;
	var res = [];
	for(var i=inicio; i<arr.length && i<fin; i++) res.push(outerHTML(arr[i]));
	return res.join(getter[1]);
}

//retorna el outerHTML de un elemento
function outerHTML(elem){
	var div = document.createElement('div');
	div.appendChild(elem.cloneNode(true));
	return div.innerHTML;
}

//setea el color del boton correspondiente a una direccion
function setCol(dir, col){
	get('wcr_btn' + dir).style.backgroundColor = col;
}

//(des)habilita los botones back/next, y desfocusea los deshabilitados para no perder el control
function disableBtn(dir, dis){
	get('wcr_btn'+dir).disabled = dis;
	if(dis) get('wcr_btn'+dir).blur();
}

//manejar el tecleo
function teclaHandler(evt){
	var wcr_settings = get('wcr_settings');
	if(wcr_settings) {
		if(evt.keyCode == 27) document.body.removeChild(wcr_settings);
		if(tabSettingActual != 'wcr_teclas') evt.stopPropagation();
		return;
	}

	//no toco nada si estoy escribiendo
	if(evt.target.tagName == 'INPUT' && evt.target.type == 'text' ||
		evt.target.tagName == 'TEXTAREA') return;

	var left = document.documentElement.scrollLeft;
	if(!left) left = document.body.scrollLeft;
	var top = document.documentElement.scrollTop;
	if(!top) top = document.body.scrollTop;

	if(checkTecla('back', evt)) btnback(evt);
	else if(checkTecla('next', evt)) btnnext(evt);
	else if(checkTecla('scroll_left', evt)) scroll(left - scrollRate, top);
	else if(checkTecla('scroll_right', evt)) scroll(left + scrollRate, top);
	else if(checkTecla('scroll_up', evt)) scroll(left, top - scrollRate);
	else if(checkTecla('scroll_down', evt)) scroll(left, top + scrollRate);
	else if(checkTecla('reload', evt)) redirect(link[posActual]);
	else if(checkTecla('set_bm', evt)) setBookmark();
	else if(checkTecla('add_bm', evt)) addBookmark();
	else if(checkTecla('layout', evt)) toggleConfKeepLayout();
	else if(checkTecla('fit', evt)) toggleConfFit();
	else if(checkTecla('debug_mode', evt)) toggleConfDebug();
	else if(checkTecla('debug_info', evt)) debugInfo();
	else if(checkTecla('botones', evt)) toggleConfShowButtons();
	else if(checkTecla('slide', evt)) slideshow();
	else if(evt.keyCode == 116 && !evt.ctrlKey) redirect(link[posActual]); //F5
	else if(evt.keyCode == 27 && !evt.ctrlKey && slider) slideshow(); //ESC para el slideshow
	else return;

	evt.stopPropagation();
	evt.preventDefault(); //frena el scrolleo con las flechas o el reloadeo original con f5
}

//revisa si se apreto la tecla configurada
function checkTecla(nombre, evt){
	var t = teclado[nombre];
	if(!t) return false;
	if(!isArray(t)) t = [t];
	var ats = ['keyCode', 'ctrlKey', 'shiftKey', 'altKey'];
	for(var i=0; i<t.length; i++){
		var ok = true;
		for(var a=0; a<ats.length; a++){
			if(t[i][ats[a]] != evt[ats[a]]){
				if(ats[a] == 'keyCode'){
					//- y + en chrome, ff15+ y ff14-
					if(mismaTecla([189, 173, 109], t[i], evt) || mismaTecla([189, 173, 109], t[i], evt)) continue;
				}
				ok = false;
				break;
			}
		}
		if(ok) return true;
	}
	return false;
}

//compara distintos keycodes para una misma tecla xq los browsers no tienen xq estar de acuerdo con lo que piensan
function mismaTecla(eqs, t, e){
	return eqs.indexOf(parseInt(t.keyCode)) >= 0 && eqs.indexOf(parseInt(e.keyCode)) >= 0;
}

//alert con url y img.src de las primeras pags, las alrededor de la actual, y las ultimas
function debugInfo(){
	if(!debug) return;
	var s = '', min, max;

	for(min=posActual; link[min-1]!==undefined; min--) continue;
	s+= mostrarLinks(min, min+3);
	if(min+4 < posActual-3) s+= '...\n' +  mostrarLinks(posActual-3, posActual+3);
	else s+= mostrarLinks(min+4, posActual+3);

	for(max=posActual; link[max+1]!==undefined; max++) continue;
	if(posActual+4 < max-3) s+= '...\n' +  mostrarLinks(max-3, max);
	else s+= mostrarLinks(posActual+4, max);

	alert(s);
}

//retorna una lista con la url de cada pagina y el src de su imagen
function mostrarLinks(inicio, fin){
	var s = '';
	for(var i=inicio; i<=fin && link[i]!==undefined; i++){
		if(i==posActual) s+= '\n<<--actual-->>\n';//'<actual>\n\t';
		s += i + ':\t' +
			(link[i] && typeof(link[i])=='object' ? link[i][0]+' ; '+link[i][1] : link[i]) +
			'\n\t' + imagen[i] + '\n';
		if(i==posActual) s+= '<<--actual-->>\n\n';//'</actual>\n';
	}
	return s;
}

//onclick next, avanza
function btnnext(evt){
	cambiaPag(flipControls ? -1 : 1);
	evt.stopPropagation();
	evt.preventDefault();
	return false;
}

//onclick back, retrocede
function btnback(evt){
	cambiaPag(flipControls ? 1 : -1);
	evt.stopPropagation();
	evt.preventDefault();
	return false;
}

//para recordar donde parten los swipes
var touchpos = {x:0, y:0, t:0};

//graba el punto de partida de un swipe
function touchstart(evt){
	var touches = evt.originalEvent.touches;
	if (touches && touches.length) {
		touchpos = {
			x: touches[0].pageX,
			y: touches[0].pageY,
			t: new Date().getTime()
		};
	}
}

//si es rapido, horizontal y de >50px, se considera un swipe y cambio de pag
function touchend(evt){
	var touches = evt.originalEvent.touches;
	if (touches && touches.length) {
		var dx = touches[0].pageX - touchpos.x;
		var dy = touches[0].pageY - touchpos.y;
		var dt = new Date().getTime() - touchpos.t;

		if(dt < 500 && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50){
			if(dx > 0) btnback(evt);
			else btnnext(evt);
		}
	}
}

//segun la mitad de la imagen donde se clickeo, avanza o retrocede
function imgClick(evt){
	return imgDerecha(evt) ? btnnext(evt) : btnback(evt);
}

//retorna true si el cursor esta sobre la mitad derecha de la imagen
function imgDerecha(evt){
	if(!leftImageClick) return true;
	var img = evt.currentTarget;
	var left = 0;
	var offset = img;
	while(offset){
		left += offset.offsetLeft;
		offset = offset.offsetParent;
	}
	if(img.style.paddingLeft) left += Number(img.style.paddingLeft.match(/\d+/)[0]);
	left -= window.scrollX;
	var x = evt.clientX - left;
	var w = img.width || img.offsetWidth;
	return x/w>0.5;
}

//muestra el cursor correspondiente al estado de la prox pag segun este en la mitad izq o der de la imagen
function imgCursor(evt){
	if(!evt || !evt.currentTarget) return;
	var img = evt.currentTarget;
	var dir = imgDerecha(evt) ? 1 : -1;
	img.style.cursor = cursor(dir, 'img');
	ultimoevt = evt;
}

//setea el cursor de la imagen y los botones
function setCursores(){
	imgCursor(ultimoevt);
	get('wcr_btn-1').style.cursor = cursor(-1, 'btns');
	get('wcr_btn1').style.cursor = cursor(1, 'btns');
}

//retorna el cursor correspondiente segun el estado de la proxima pag (y aprovecha de (des)habilitar el boton)
function cursor(dir, elem){
	if(!link[posActual+dir]){ //no hay link
		disableBtn(dir, true);
		return confCursor('nolink', elem, 'not-allowed');
	}
	if(imagen[posActual+dir]===null || imagenOK[posActual+dir]===false){ //no hay img
		disableBtn(dir, false);
		return confCursor('noimg', elem, 'pointer');
	}
	if(imagenOK[posActual+dir]===undefined){ //cargando img
		disableBtn(dir, !moveWhileLoading);
		return confCursor('loading', elem, 'progress');
	}
	disableBtn(dir, false);
	return confCursor(dir>0 ? 'next' : 'back', elem, dir>0 ? 2 : 1);
}

//redirige a una url o postea si es q es necesario
function redirect(url){
	if(!url){
		document.location.reload();
		return;
	}

	if(typeof(url)=='string'){
		document.location.href = url.split('#')[0];
		return;
	}

	form = document.createElement('form');
	form.method = 'POST';
	form.action = url[0];
	form.name = 'jsform';
	var pars = url[1].split('&');
	for(var i=0; i<pars.length; i++){
		var input = document.createElement('input');
		input.type='hidden';
		var par = pars[i].split('=');
		input.name = par[0];
		input.id = par[0];
		input.value = par[1];
		form.appendChild(input);
	}
	document.body.appendChild(form);
	form.submit();
}

//mostrar mensajes de error en modo debug
function error(msg){
	msg = (link[posActual] || document.location.href) + '\n\n' + msg;
	if(console && console.log) console.log(msg);
	if(debug) alert(msg);
}

//ejecutar un script fuera del sandbox
function exec(script){
	document.location.href = 'javascript:(function(){' + script + '})();';
}

//ejecuta un request sincrono y retorna el html
function syncRequest(url, pos){
	var request = new XMLHttpRequest();
	request.open('GET', absUrl(url, pos), false);
	request.send(null);

	if(request.status === 200) return request.responseText;
	throw request.statusText;
}

//si se especifica no se toca, si no se usa el host sin el "www."
function dominioData(dominio){
	if(!dominio) return document.location.host.replace(/^www\./, '');
	return dominio;
}

//guarda la configuracion usando una pura variable (json)
function setData(key, val, dominio){
	var data = JSON.parse(GM_getValue('wcr.settings', '{}'));
	dominio = dominioData(dominio);

	if(data[dominio] === undefined) data[dominio] = {};
	if(key) data[dominio][key] = val;
	else data[dominio] = val;

	dataCache = data;
	return GM_setValue('wcr.settings', JSON.stringify(data));
}

//recupera un valor de la configuracion, y si esta en el formato viejo lo guarda en el nuevo y bora el viejo
function getData(key, defval, dominio, reloadCache){
	if(reloadCache || !dataCache) dataCache = JSON.parse(GM_getValue('wcr.settings', '{}'));
	var data = dataCache;
	dominio = dominioData(dominio);

	var val;
	try{ val = key ? data[dominio][key] : data[dominio]; }
	catch(e){}
	if(val === undefined) val = defval;

	return val;
}

//borra un valor de la configuracion
function delData(key, dominio){
	var data = JSON.parse(GM_getValue('wcr.settings', '{}'));
	dominio = dominioData(dominio);

	if(data[dominio]){
		if(key) delete data[dominio][key];
		if(!key || JSON.stringify(data[dominio]) == '{}') delete data[dominio];
	}

	var json = JSON.stringify(data);
	if(json == '{}') GM_deleteValue('wcr.settings');
	else GM_setValue('wcr.settings', json);
	dataCache = data;
}

//retorna la ultima pagina visitada para este sitio
function getUltima(){
	var pag = getData('last', '');
	if(pag == '') return;

	//convierte el formato viejo
	if(typeof(pag) == 'string'){
		var pags = pag.split('|wcrbmtit|');
		pag = {url: pags[0], title: pags[1]};
	}
	get('wcr_ultimavisita').innerHTML = '<br/>Last visited: <a href="'+pag['url']+'" title="'+pag['url']+'">'+pag['title']+'</a>';
}

//graba la ultima pagina visitada para este sitio
function saveUltima(){
	setData('last', {url: link[posActual], title: titulo[posActual]});
}

//retorna una lista con las pags bookmarkeadas para este sitio en formato [{url:'...', title:'...'}]
function getListaBookmarks(reloadCache){
	var lista = getData('bm', '', '', reloadCache);
	if(lista == '') return [];

	//convierte el formato viejo
	if(typeof(lista) == 'string'){
		lista = lista.split('|wcrbm|');
		for(var i=0;i<lista.length;i++){
			var pags = lista[i].split('|wcrbmtit|');
			lista[i] = {url: pags[0], title: pags[1]};
		}
	}
	return lista;
}

//retorna una lista con las pags bookmarkeadas de todos los sitios en formato {'sitio1': [...], ...}
function getListaBookmarksTodos(reloadCache){
	var listaTodos = {}, lista = null, este = dominioData();

	for(var sitio in dataCache){
		if(!dataCache[sitio].bm || sitio == este) continue;

		lista = dataCache[sitio].bm
		//convierte el formato viejo
		if(typeof(lista) == 'string'){
			lista = lista.split('|wcrbm|');
			for(var i=0;i<lista.length;i++){
				var pags = lista[i].split('|wcrbmtit|');
				lista[i] = {url: pags[0], title: pags[1]};
			}
		}
		listaTodos[sitio] = lista;
	}

	return lista ? listaTodos : null;
}

//graba la lista de pags bookmarkeadas
function saveListaBookmarks(lista){
	if(lista.length) setData('bm', lista);
	else delData('bm');
}

//agrega un item al div con los bookmarks
function addLista(item){
	var a = document.createElement('a');
	a.href = a.title = item['url'];
	a.innerHTML = item['title']+' ';

	var btndel = document.createElement('button');
	btndel.innerHTML = 'Delete';
	btndel.style.backgroundColor = '#f00';
	setEvt(btndel, 'click', delBookmark);

	var div = document.createElement('div');
	div.appendChild(a);
	div.appendChild(btndel);
	get('wcr_listabm').appendChild(div);
}

//agrega la pag actual a la lista de bookmarks
function addBookmark(evt){
	var lista = getListaBookmarks(true);
	for(var i=0;i<lista.length;i++){
		if(lista[i]['url']==link[posActual]) return;
	}
	var item = {url: link[posActual], title: titulo[posActual]};
	lista.push(item);
	addLista(item);

	saveListaBookmarks(lista);
	if(evt) evt.stopPropagation();
}

//borra un bookmark de la lista
function delBookmark(evt){
	var lista = getListaBookmarks(true);
	var div = evt.target.parentNode;
	var divs = div.parentNode.childNodes;
	var num;
	for(num=0; div!=divs[num] && num<divs.length; num++) continue;

	lista.splice(num, 1);
	div.parentNode.removeChild(div);

	saveListaBookmarks(lista);
	evt.stopPropagation();
}

//borra todos los bookmarks
function clearBookmarks(){
	get('wcr_listabm').innerHTML = '';
	saveListaBookmarks([]);
}

//setea la pag actual como unico bookmark
function setBookmark(){
	clearBookmarks();
	addBookmark();
}

//retorna la configuracion de layout para esta pag (true/false: usar el layout original/limpio)
//busca la conf especifica para esta pag, si no hay usa la default, si tampoco hay usa defval
function confKeepLayout(defval, defpag){
	return confBool('layout', defval, defpag);
}

//retorna el num de pags a prefetchear en cada dir
function confPrefetchSize(defval){
	return [confVal('prefetch_izq', defval[0]), confVal('prefetch_der', defval[1])];
}

//retorna el num de pags a prefetchear en cada dir cuando parte la pag
function confPrefetchSizeStart(defval){
	return [confVal('prefetch_start_izq', defval[0]), confVal('prefetch_start_der', defval[1])];
}

//si es true, al hacer click en la mitad izquierda de la img se avanza para atras, si no siempre es para adelante
function confLeftImageClick(defval){
	return confBool('click_img_izq', defval);
}

//saca de la conf el cursor q corresponde al estado y elemento pedido, y si es un custom lo convierte
function confCursor(conf, elem, defval){
	var val = defval;
	if(conf){
		if(!confBool('chcursor_'+elem, true)) return elem == 'img' ? 'pointer' : 'auto';
		val = confVal('cursor_'+conf, defval);
	}

	if(!Number(val)) return val;
	return cursorUrl(cursores_custom[val]);
}

//convierte un cursor custom (url o base64) al formato url
function cursorUrl(val){
	if(!val) return 'auto';
	if(val.match(/[^a-z0-9+\/=]/i)) return  "url("+val+") 16 16, auto";
	return "url('data:image/cursor;base64,"+val+"') 16 16, auto";
}

//busca una conf booleana (guardada como '0'/'1') especifica para esta pag, si no hay usa la default, si tampoco hay usa defval
function confBool(conf, defval, defpag, reloadCache){
	var val = confVal(conf, defval, defpag, reloadCache);
	return val == '1' || val === true;
}

//busca una conf especifica para esta pag, si no hay usa la default, si tampoco hay usa defval
function confVal(conf, defval, defpag, reloadCache){
	var val = getData(conf, '', undefined, reloadCache);
	if(val == ''){
		if(defpag !== undefined) val = defpag;
		else val = getData(conf, '', 'default');
	}
	if(val == '') return defval;
	return val;
}

//alterna la configuracion de layout del dominio (si no se pasa el dominio se usa la de este host)
function toggleConfKeepLayout(){
	toggleConfBool('layout', keepLayout);
	redirect(link[posActual]);
}

//dice si mostrar o no todos los botones (back/next, bookmarks, fit/layout/settings)
function confShowButtons(defval){
	return confBool('botones', defval);
}

//alterna entre mostrar o no todos los botones (back/next, bookmarks, fit/layout/settings)
function toggleConfShowButtons(){
	showButtons = toggleConfBool('botones', showButtons);
	get('wcr_botones').style.display = showButtons ? '' : 'none';
}

//alterna entre fittear y no fittear la imagen
function toggleConfFit(){
	fitSize = toggleConfBool('fit', fitSize);
	fitImagen();
	scrollear();
	get('wcr_btnfit').innerHTML = (fitSize ? 'Disable' : 'Enable') + ' Fit-to-screen';
}

//alterna una conf booleana para esta pag
function toggleConfBool(conf, defval){
	var val = confBool(conf, defval, undefined, true);
	setData(conf, val ? '0' : '1');
	return !val;
}

//retorna si esta pag esta en modo debug leyendo la configuracion
function confDebug(defval){
	return getData('debug', defval);
}

//alterna el modo debug en esta pagina
function toggleConfDebug(){
	debug = !debug;
	setData('debug', debug);
	alert('Debug mode '+ (debug ? 'ON' : 'OFF'));
}

//leer la configuracion de las teclas, o cargar las default si no existen
function getTeclas(){
	var teclas = getData('teclas', teclado, 'default');
	for(var t in teclas) teclado[t] = teclas[t];
	return teclado;
}

//retorna el nombre de la tecla apretada con sus modificadores
function nombreTecla(evt){
	var pre = '';
	if(evt.ctrlKey) pre += 'CTRL + ';
	if(evt.shiftKey) pre += 'SHIFT + ';
	if(evt.altKey) pre += 'ALT + ';

	if(evt.charCode) return pre + String.fromCharCode(evt.charCode).toUpperCase();
	if(evt.keyCode >= 112 && evt.keyCode <= 135) return pre + 'F' + (evt.keyCode - 111);
	var kc = {
		3: 'CANCEL',
		6: 'HELP',
		8: 'BACK_SPACE',
		9: 'TAB',
		12: 'CLEAR',
		13: 'RETURN',
		14: 'ENTER',
		16: 'SHIFT',
		17: 'CONTROL',
		18: 'ALT',
		19: 'PAUSE',
		20: 'CAPS_LOCK',
		27: 'ESCAPE',
		32: 'SPACE',
		33: 'PAGE_UP',
		34: 'PAGE_DOWN',
		35: 'END',
		36: 'HOME',
		37: 'LEFT',
		38: 'UP',
		39: 'RIGHT',
		40: 'DOWN',
		44: 'PRINTSCREEN',
		45: 'INSERT',
		46: 'DELETE',
		93: 'CONTEXT_MENU',
		106: 'MULTIPLY',
		107: 'ADD',
		108: 'SEPARATOR',
		109: 'SUBTRACT',
		110: 'DECIMAL',
		111: 'DIVIDE',
		144: 'NUM_LOCK',
		145: 'SCROLL_LOCK',
		188: 'COMMA',
		190: 'PERIOD',
		191: 'SLASH',
		192: 'BACK_QUOTE',
		219: 'OPEN_BRACKET',
		220: 'BACK_SLASH',
		221: 'CLOSE_BRACKET',
		222: 'QUOTE',
		224: 'META'
	};
	return pre + (kc[evt.keyCode] || ('??? ('+evt.keyCode+')'));
}

//un solo menu q abre la pantalla de configuracion con todas las opciones
if(GM_registerMenuCommand){
	GM_registerMenuCommand('Webcomic Reader - Settings', mostrarSettings);
}

//Script update checker from http://userscripts.org/scripts/review/20145
if (GM_xmlhttpRequest) {
	var SUC_script_num = 59842; // Change this to the number given to the script by userscripts.org (check the address bar)
	try {
		function updateCheck(forced) {
			var dias = getData('updateDays', 1, 'default');
			if ((forced) || dias && (parseInt(GM_getValue('SUC_last_update', '0')) + dias*86400000 <= (new Date().getTime()))) {
				try {
					GM_xmlhttpRequest({
						method: 'GET',
						url: 'http://userscripts.org/scripts/source/' + SUC_script_num + '.meta.js?' + new Date().getTime(),
						headers: { 'Cache-Control': 'no-cache' },
						onload: function(resp) {
							var local_version, remote_version, rt, script_name;
							rt = resp.responseText;
							GM_setValue('SUC_last_update', new Date().getTime() + '');
							remote_version = parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
							local_version = parseInt(GM_getValue('SUC_current_version', '-1'));
							if (local_version != -1) {
								script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
								if (remote_version > local_version) {
									//version oficial (yyyy-mm-dd(.n)?)
									var version = rt.match(/@version\s+(.+)/)[1];

									//comentarios del ultimo cambio
									var cambios = rt.match(/@lastchanges\s+(.+)/);
									cambios = cambios ? cambios[1] : false;

									//flags con el tipo de cosas del update. si ninguna me importa, me salgo
									var tipo = rt.match(/@updatetype +(\d+)/);
									if(!forced && tipo && !(getData('updateFlags', (1<<16)-1, 'default') & Number(tipo[1]))) return;

									var accion = getData('updateAction', 0, 'default');
									if (accion & 2 || confirm(
										'There is an update available for the Greasemonkey script "' + script_name + '" ('+version+')' +
										(cambios ? '\n\nLast changes: ' + cambios : '') + '\n\nWould you like to '+
										(accion & 1 ? 'install it now?' : 'go to the install page now?'))){

										GM_setValue('SUC_current_version', remote_version);

										if(accion & 1) document.location.href = 'http://userscripts.org/scripts/source/' + SUC_script_num + '.user.js';
										else GM_openInTab('http://userscripts.org/scripts/show/' + SUC_script_num);
									}
								} else if (forced) alert('No update is available for "' + script_name + '."');
							} else GM_setValue('SUC_current_version', remote_version + '');
						}
					});
				} catch(err) {
					if (forced) alert('An error occurred while checking for updates:\n' + err);
				}
			}
		}
		if(getData('autoUpdate', true, 'default')) updateCheck(false);
	} catch(err) {}
}

var tabSettingActual = 'wcr_general'; //para acordarse por mientras del tab q deje abierto en los settings

//mostrar la pantalla de configuracion
function mostrarSettings(){
	try{
		if(get('wcr_settings')) return; //si ya esta abierta la pantalla, no hacer nada

		dataCache = null; //forzar a q se cargue todo de nuevo, por si cambiaron algo en otro tab

		//propiedades editables de la configuracion del sitio
		var propsSitio = {
			url:{ desc: 'URL', title: "Define what sites will use these settings",
				tipos:{
					str:{ desc: 'Beginning of URL',
						val:{ elem: 'input', title: "Beginning of the url without the http://www.", size: 60 }
					},
					re:{ desc: "RegExp",
						val:{ elem: 'input', title: "Regular expression that matches the url", size: 60 }
					}
				}
			},
			img:{ desc:'Image', title:"Method for obtaining the main image",
				tipos:{
					def:{ desc: 'Default',
						val:{ elem: 'span', html: '&lt;img&gt; that is the only one with a "src" containing one of the following strings: "/comics/", "/comic/", "/strips/", "/strip/", "/archives/", "/archive/", "/wp-content/uploads/", "comics", "comic", "strips", "strip", "archives", "archive", "/manga/"' }
					},
					str:{ desc: 'Beginning of src',
						val:{ elem: 'input', title: "Beginning of the &quot;src&quot; attribute of the &lt;img&gt;", size: 60 }
					},
					re:{ desc: 'RegExp',
						val:{ elem: 'input', title: "Regular expression that captures the whole &lt;img&gt; (or at least the &quot;src&quot; and &quot;title&quot; attributes)", size: 50 },
						grp:{ elem: 'input', title: "Number of the group that captured the &lt;img&gt;", size: 1 }
					},
					xp:{ desc: 'XPath',
						val:{ elem: 'input', title: "XPath query that returns the &lt;img&gt;", size: 60 }
					},
					css:{ desc: 'CSS selector',
						val:{ elem: 'input', title: "CSS query that returns the &lt;img&gt;", size: 60 }
					},
					fn:{ desc: 'function(html, pos)',
						val:{ elem: 'textarea', title: "Function that receives the html of the page and its position relative to the starting page (0 being where you started reading), and returns the &lt;img&gt; element (either as string or object)", rows:3, cols:45 }
					}
				}
			},
			back:{ desc: 'Back', title: 'Method for obtaining the link to the previous page',
				tipos:{
					def:{ desc: 'Default',
						val:{ elem: 'span', html: '&lt;a&gt; that has the word "back" or "prev" somewhere in its innerHTML or one of its attributes' }
					},
					str:{ desc: 'XPath condition',
						val:{ elem: 'input', title: 'Condition for the following XPath query: //a[condition]/@href', size: 60 }
					},
					re:{ desc: 'RegExp',
						val:{ elem: 'input', title: "Regular expression that captures the URL of the previous page", size: 50 },
						grp:{ elem: 'input', title: "Number of the group that captured the URL", size: 1 }
					},
					xp:{ desc: 'XPath',
						val:{ elem: 'input', title: "XPath query that returns the URL of the previous page, or the &lt;a&gt; element that links to it", size: 60 }
					},
					css:{ desc: 'CSS selector',
						val:{ elem: 'input', title: "CSS query that returns the &lt;a&gt; element that links to the previous page", size: 60 }
					},
					fn:{ desc: 'function(html, pos)',
						val:{ elem: 'textarea', title: "Function that receives the html of the page and its position relative to the starting page (0 being where you started reading), and returns the URL of the previous page", rows:3, cols:45 }
					}
				}
			},
			next:{ desc: 'Next', title: 'Method for obtaining the link to the next page',
				tipos:{
					def:{ desc: 'Default',
						val:{ elem: 'span', html: '&lt;a&gt; that has the word "next" somewhere in its innerHTML or one of its attributes' }
					},
					str:{ desc: 'XPath condition',
						val:{ elem: 'input', title: 'Condition for the following XPath query: //a[condition]/@href', size: 60 }
					},
					re:{ desc: 'RegExp',
						val:{ elem: 'input', title: "Regular expression that captures the URL of the next page", size: 50 },
						grp:{ elem: 'input', title: "Number of the group that captured the URL", size: 1 }
					},
					xp:{ desc: 'XPath',
						val:{ elem: 'input', title: "XPath query that returns the URL of the next page, or the &lt;a&gt; element that links to it", size: 60 }
					},
					css:{ desc: 'CSS selector',
						val:{ elem: 'input', title: "CSS query that returns the &lt;a&gt; element that links to the next page", size: 60 }
					},
					fn:{ desc: 'function(html, pos)',
						val:{ elem: 'textarea', title: "Function that receives the html of the page and its position relative to the starting page (0 being where you started reading), and returns the URL of the next page", rows:3, cols:45 }
					}
				}
			},
			first:{ desc: 'First', title: 'Method for obtaining the link to the first page',
				tipos:{
					def:{ desc: 'Default',
						val:{ elem: 'span', html: '&lt;a&gt; that has the word "first" somewhere in its innerHTML or one of its attributes' }
					},
					str:{ desc: 'XPath condition',
						val:{ elem: 'input', title: 'Condition for the following XPath query: //a[condition]/@href', size: 60 }
					},
					re:{ desc: 'RegExp',
						val:{ elem: 'input', title: "Regular expression that captures the URL of the first page", size: 50 },
						grp:{ elem: 'input', title: "Number of the group that captured the URL", size: 1 }
					},
					xp:{ desc: 'XPath',
						val:{ elem: 'input', title: "XPath query that returns the URL of the first page, or the &lt;a&gt; element that links to it", size: 60 }
					},
					css:{ desc: 'CSS selector',
						val:{ elem: 'input', title: "CSS query that returns the &lt;a&gt; element that links to the first page", size: 60 }
					},
					fn:{ desc: 'function(html)',
						val:{ elem: 'textarea', title: "Function that receives the html of the page and returns the URL of the first page", rows:3, cols:45 }
					}
				}
			},
			last:{ desc: 'Last', title: 'Method for obtaining the link to the last page',
				tipos:{
					def:{ desc: 'Default',
						val:{ elem: 'span', html: '&lt;a&gt; that has the word "last", "latest", "newest" or "today" somewhere in its innerHTML or one of its attributes' }
					},
					str:{ desc: 'XPath condition',
						val:{ elem: 'input', title: 'Condition for the following XPath query: //a[condition]/@href', size: 60 }
					},
					re:{ desc: 'RegExp',
						val:{ elem: 'input', title: "Regular expression that captures the URL of the last page", size: 50 },
						grp:{ elem: 'input', title: "Number of the group that captured the URL", size: 1 }
					},
					xp:{ desc: 'XPath',
						val:{ elem: 'input', title: "XPath query that returns the URL of the last page, or the &lt;a&gt; element that links to it", size: 60 }
					},
					css:{ desc: 'CSS selector',
						val:{ elem: 'input', title: "CSS query that returns the &lt;a&gt; element that links to the last page", size: 60 }
					},
					fn:{ desc: 'function(html)',
						val:{ elem: 'textarea', title: "Function that receives the html of the page and returns the URL of the last page", rows:3, cols:45 }
					}
				}
			},
			fixurl:{ desc: 'Fix URL', title: 'Fix URLs coming from a link or img.src for sites that may need it (like relative URLs that don\'t behave normally, or links from http://something.com to http://www.something.com that wouldn\'t work because of cross site request limitations)',
				tipos:{
					def:{ desc: 'Default',
						val:{ elem: 'span', html: 'Do nothing' }
					},
					fn:{ desc: 'function(url, img, link, pos)',
						val: { elem: 'textarea', title: 'Function that receives an URL, and flags telling if it came from an img.src or link to another page, and returns the fixed url', rows:3, cols:45 }
					}
				}
			},
			extra:{ desc: 'Extra Content', title: 'Other content besides the main image to get from each page',
				tipos:{
					str:{ desc: 'Literal string',
						val:{ elem: 'input', title: 'HTML string, this will be output literally', size: 60 }
					},
					re:{ desc: 'RegExp',
						val:{ elem: 'input', title: "Regular expression that captures the desired content", size: 50 },
						grp:{ elem: 'input', title: "Number of the group that captured the content", size: 1 }
					},
					xp:{ desc: 'XPath',
						val:{ elem: 'input', title: "XPath query that returns the desired content", size: 60 },
						arr:{ elem: 'select', html: '<option value="">First element</option><option value="1">List of elements</option>'},
						glue:{ elem: 'input', title: 'String to put between each pair of elements returned', size: 20},
						first:{ elem: 'input', title: 'Index of the first element to return (starting from 0, negative means counting from the last)', size: 1},
						last:{ elem: 'input', title: 'Index of the last element to return (starting from 0, negative means counting from the last)', size: 1}
					},
					css:{ desc: 'CSS selector',
						val:{ elem: 'input', title: "CSS query that returns the desired content", size: 60 },
						arr:{ elem: 'select', html: '<option value="">First element</option><option value="1">List of elements</option>'},
						glue:{ elem: 'input', title: 'String to put between each pair of elements returned', size: 20},
						first:{ elem: 'input', title: 'Index of the first element to return (starting from 0, negative means counting from the last)', size: 1},
						last:{ elem: 'input', title: 'Index of the last element to return (starting from 0, negative means counting from the last)', size: 1}
					},
					fn:{ desc: 'function(html, pos)',
						val:{ elem: 'textarea', title: "Function that receives the html of the page and its position relative to the starting page (0 being where you started reading), and returns the desired content", rows:3, cols:45 }
					}
				}
			},
			xelem:{ desc: 'Extras Container', title: 'Element for placing the extra content when using the full layout',
				tipos:{
					def:{ desc: 'Default',
						val:{ elem: 'span', html: 'Inside the WCR container (between the image and the back/next buttons)' }
					},
					str:{ desc: 'XPath',
						val: { elem: 'input', title: 'XPath query that returns the element where the extra content will be placed as its innerHTML', size:60 }
					}
				}
			},
			layelem:{ desc: 'Layout Container', title: 'Element for placing the image and the rest of the script content when using the full layout',
				tipos:{
					def:{ desc: 'Default',
						val:{ elem: 'span', html: 'Where the original image was' }
					},
					str:{ desc: 'XPath',
						val: { elem: 'input', title: 'XPath query that returns the element where the content will be placed as its innerHTML', size:60 }
					}
				}
			},
			js:{ desc: 'Custom Action', title: 'Custom function to execute after each page change',
				tipos:{
					def:{ desc: 'Default',
						val:{ elem: 'span', html: 'Do nothing' }
					},
					fn:{ desc: 'function(dir)',
						val: { elem: 'textarea', title: 'Function that receives the direction in which the page was changed (0 when the starting page is loaded, 1 when going forward and -1 when going backwards)', rows:3, cols:45 }
					}
				}
			},
			style:{ desc: 'Custom CSS', title: 'Custom CSS styles',
				tipos:{
					def:{ desc: 'Default',
						val:{ elem: 'span', html: 'Don\'t change anything' }
					},
					str:{ desc: 'CSS rules',
						val: { elem: 'textarea', title: 'CSS rules', rows:3, cols:45 }
					}
				}
			},
			bgcol:{ desc: 'Background Color',
				tipos:{
					def:{ desc: 'Default',
						val:{ elem: 'span', html: 'Keep original' }
					},
					str:{ desc: 'Custom',
						val: { elem: 'input', title: '#RRGGBB or #RGB', size:6 }
					}
				}
			},
			txtcol:{ desc: 'Text Color',
				tipos:{
					def:{ desc: 'Default',
						val:{ elem: 'span', html: 'Keep original' }
					},
					str:{ desc: 'Custom',
						val: { elem: 'input', title: '#RRGGBB or #RGB', size:6 }
					}
				}
			},
			scrollx:{ desc: 'Default Horizontal Autoscroll', title: 'Scroll to this position of the image each time you change the page',
				tipos:{
					def:{ desc: 'Default',
						val:{ elem: 'span', html: 'Left' }
					},
					str:{ desc: 'Relative to image',
						val: { elem: 'select', html: '<option value="L">Left</option><option value="R">Right</option><option value="M">Middle</option>' }
					},
					num:{ desc: 'Pixels',
						val: { elem: 'input', title: 'X coordinate in pixels', size: 5 }
					},
					fn:{ desc: 'function()',
						val:{ elem: 'textarea', title: "Function that returns the numbers of pixels to scroll", rows:3, cols:45 }
					}
				}
			},
			scrolly:{ desc: 'Default Vertical Autoscroll', title: 'Scroll to this position of the image each time you change the page',
				tipos:{
					def:{ desc: 'Default',
						val:{ elem: 'span', html: 'Top' }
					},
					str:{ desc: 'Relative to image',
						val: { elem: 'select', html: '<option value="U">Top</option><option value="D">Bottom</option><option value="M">Middle</option>' }
					},
					num:{ desc: 'Pixels',
						val: { elem: 'input', title: 'Y coordinate in pixels', size: 5 }
					},
					fn:{ desc: 'function()',
						val:{ elem: 'textarea', title: "Function that returns the numbers of pixels to scroll", rows:3, cols:45 }
					}
				}
			},
			layout:{ desc: 'Default Layout', title: 'Layout to use when no custom layout settings are defined for this site',
				tipos:{
					def:{ desc: 'Default',
						val:{ elem: 'span', html: 'Use default settings' }
					},
					bool:{ desc: 'Custom',
						val: { elem: 'select', html: '<option value="false">Minimalistic</option><option value="true">Keep original</option>' }
					}
				}
			}
		};

		//tipos de actualizaciones
		var listaTipos = [
			'Bug fixes (Firefox)',
			'Bug fixes (Other browsers)',
			'New features',
			'New sites',
			'Fixes for old sites',
			'Graphic changes',
			'New options'];
		var t, tiposUp = {};
		for(t=0; t<listaTipos.length;t++) tiposUp[1<<t] = listaTipos[t];
		tiposUp[(1<<16)-(1<<t)] = 'Other stuff (???)';

		//teclas configurables
		var teclas = {
			back: ['Back', 'Go back 1 page'],
			next: ['Next', 'Go forward 1 page'],
			scroll_left: ['Scroll left', ''],
			scroll_right: ['Scroll right', ''],
			scroll_up: ['Scroll up', ''],
			scroll_down: ['Scroll down', ''],
			reload: ['Reload', 'Reload the current page (in old browsers, pressing the reload button will take you back to where you started). F5 will always do this (unless set to another action)'],
			set_bm: ['Set as only bookmark', 'Delete other bookmarks and add this page, so that the next time you visit the site you will be taken back to this page'],
			add_bm: ['Add to bookmarks', ''],
			layout: ['Toggle layout', 'Switch between the &quot;clean layout&quot; (show only image and buttons) and &quot;full layout&quot; (show the whole original page)'],
			botones: ['Toggle buttons', 'Switch between showing or hiding all the script\'s buttons (back/next, bookmarks, settings, etc...)'],
			fit: ['Toggle Fit-to-screen', 'Switch between always showing the image in its original size or fitting it to the screen when needed'],
			slide: ['Toggle Slideshow', 'Start or stop the slideshow mode (pages turn automatically after the selected time). Slideshow will also stop by pressing ESC or manually turning a page'],
			debug_mode: ['Toggle debug mode', 'In debug mode you\'ll get alerts to see what isn\'t working. Useful when adding new sites'],
			debug_info: ['Debug info (on debug mode)', 'Show a list of URLs of the preloaded pages and images']
		};

		var arrcursores = ['default', 'none', 'context-menu', 'help', 'pointer', 'progress', 'wait', 'cell', 'crosshair', 'text', 'vertical-text', 'alias', 'copy', 'move', 'no-drop', 'not-allowed', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize'];
		if(isFirefox()) arrcursores.push('-moz-grab', '-moz-grabbing', '-moz-zoom-in', '-moz-zoom-out');
		if(isWebKit())  arrcursores.push('-webkit-grab', '-webkit-grabbing', '-webkit-zoom-in', '-webkit-zoom-out');
		var cursores = {
			'1': 'Left green arrow',
			'2': 'Right green arrow',
			'5': 'Left blue arrow',
			'6': 'Right blue arrow',
			'3': 'Custom cursor #1',
			'4': 'Custom cursor #2'
		};
		for(var c=0; c<arrcursores.length; c++) cursores[arrcursores[c]] = arrcursores[c];

		//opciones generales
		var opsGeneral = {
			click_img_izq:{ desc:'Click left half of<br/>image to go back', title:'If enabled, clicking the left half of the image will take you to the previous page, and the right half to the next one. Otherwise, clicking anywhere will always take you to the next page',
				def: defaultSettings.clikLeftHalfGoesBack ? '1' : '0',
				vals:{
					'0':'Disabled',
					'1':'Enabled'
				}
			},
			flipControlsManga:{ desc:'Flip controls<br/>for mangas', title:'If enabled, flips the controls (L/R arrows, L/R image click, back/next buttons) for mangas or other right-to-left content',
				def: defaultSettings.flipControlsManga ? '1' : '0',
				vals:{
					'0':'Disabled',
					'1':'Enabled'
				}
			},
			overwrite_links:{ desc:'Overwrite links', title:'If enabled, overwrites the original back/next links (when using the original layout) to work like the script\'s buttons', 
				def:'1',
				vals:{
					'0':'Disabled',
					'1':'Enabled'
				}
			},
			goToBookmark:{ desc: 'Go to bookmark', title: 'If you have 1 bookmark saved for a site, asks you if you want to go there when you visit the site', 
				def: defaultSettings.goToBookmark ? '1' : '0',
				vals:{
					'0':'Disabled',
					'1':'Enabled'
				}
			},
			scroll_rate:{ desc:'Scroll rate', title:'Number of pixels to scroll when using the keyboard', def:'50'},
			b64_images:{ desc:'Force cache (experimental)', title:'Chache images as base64 strings, so the browser doesn\'t unload them to save memory',
				def:'0',
				vals:{
					'0':'Disabled',
					'1':'Enabled'
				}
			},
			useHistoryAPI:{ desc: 'Use browser history', title: 'Changes the URL and keeps track of the visited pages in the browser history, so you can navigate with the browser\'s back/forward buttons as usual', 
				def: '1',
				vals:{
					'0':'Disabled',
					'1':'Enabled'
				}
			},
			moveWhileLoading:{ desc: 'Force loading next page', title: 'Lets you move to the next or previous page before the image for that page has finished loading',
				def: defaultSettings.moveWhileLoading ? '1' : '0',
				vals:{
					'0':'Disabled',
					'1':'Enabled'
				}
			},

			_grp_fit:{ desc:'AutoZoom', title:'Automatically zoom the image, either shrinking or expanding it to make it fit in the screen' },
			fit:{ desc:'Fit image to screen', title:'Apply options below to fit the image to the screen (if none of them are selected and you enable this option, you will be prompted to select the settings the first time you visit each site). This setting can also be toggled for this site with a keyboard shortcut (+ by default)',
				def: defaultSettings.autozoom ? '1' : '0',
				vals:{
					'0':'Disabled',
					'1':'Enabled'
				}
			},
			achw:{ desc:'Shrink to fit width', title:'If the image is wider than the window, it will be shrunk to fit the screen without needing to scroll',
				def: defaultSettings.shrinkWidth ? '1' : '0',
				vals:{
					'0':'Never shrink',
					'1':'Shrink when needed'
				}
			},
			achh:{ desc:'Shrink to fit height', title:'If the image is longer than the window, it will be shrunk to fit the screen without needing to scroll',
				def: defaultSettings.shrinkHeight ? '1' : '0',
				vals:{
					'0':'Never shrink',
					'1':'Shrink when needed'
				}
			},
			agrw:{ desc:'Expand to fit width', title:'If the image is smaller than the window, it will be expanded to fit the screen',
				def: defaultSettings.expandWidth ? '1' : '0',
				vals:{
					'0':'Never expand',
					'1':'Expand when needed'
				}
			},
			agrh:{ desc:'Expand to fit height', title:'If the image is smaller than the window, it will be expanded to fit the screen',
				def: defaultSettings.expandHeight ? '1' : '0',
				vals:{
					'0':'Never expand',
					'1':'Expand when needed'
				}
			},
			maxScale:{ desc:'Max scale', title: 'Maximum scale (as a percentage, > 100) to which the image should be expanded (leave blank for no limit)'},
			minScale:{ desc:'Min scale', title: 'Minimum scale (as a percentage, < 100) to which the image should be shrunk (leave blank for no limit)'},
			maxScaleReset:{ desc:'Over max scale', title: 'Action to be taken when the AutoZoom would expand the image over the max scale',
				def: '0',
				vals: {
					'0': 'Keep the max scale',
					'1': 'Reset to original size'
				}
			},
			minScaleReset:{ desc:'Under min scale', title: 'Action to be taken when the AutoZoom would shrink the image over the min scale',
				def: '0',
				vals: {
					'0': 'Keep the min scale',
					'1': 'Reset to original size'
				}
			},

			_grp_scroll:{ desc: 'AutoScroll', title:'Scroll to this position of the image each time you change the page' },
			scrollx:{ desc:'Horizontal', title:'Scroll to this position of the image each time you change the page',
				vals:{
					'L':'Left',
					'R':'Right',
					'M':'Middle'
				}
			},
			scrolly:{ desc:'Vertical', title:'Scroll to this position of the image each time you change the page',
				vals:{
					'U':'Top',
					'D':'Bottom',
					'M':'Middle'
				}
			},

			_grp_prefetch:{ desc:'Page Preloading', title:'Adjust the number of pages to preload in each direction' },
			prefetch_der:{ desc:'Forward', title:'The number of next pages to preload (>0)',
				def:defaultSettings.prefetchNext},
			prefetch_izq:{ desc:'Backwards', title:'The number of previous pages to preload (>0)',
				def:defaultSettings.prefetchBack},
			prefetch_start_der:{ desc:'Initial forward', title:'The number of next pages to preload (>0) when the page is first loaded (to avoid wasting bandwith if you only wanted to see that page)',
				def:defaultSettings.prefetchNextStart},
			prefetch_start_izq:{ desc:'Initial backwards', title:'The number of previous pages to preload (>0) when the page is first loaded (to avoid wasting bandwith if you only wanted to see that page)',
				def:defaultSettings.prefetchBackStart},
			prefetchNoNext:{ desc:'Prefetch when no next page', title:'Disable this to stop preloading the previous page when visiting the last page (ie, the next page was not found)',
				def:defaultSettings.prefetchNoNext ? '1' : '0',
				vals:{
					'0':'Disabled',
					'1':'Enabled'
				}}
		};

		//opciones visuales
		var opsLayout = {
			layout:{ desc:'Layout', title:'Minimalistic layout will show only the image, the defined extra content, and this script\'s buttons. Keeping the original layout will stuff that same content in the place where the image used to be, leaving the rest of the page untouched. This setting can also be toggled for this site with a keyboard shortcut (- by default)', 
				def: defaultSettings.fullLayout ? '1' : '0',
				vals:{
					'0':'Minimalistic',
					'1':'Keep original'
				}
			},
			botones:{ desc:'Buttons', title:'Show or hide all the script\'s buttons (back/next, bookmarks, settings, etc...). This setting can also be toggled for this site with a keyboard shortcut (Shift + - by default)',
				def: defaultSettings.showButtons ? '1' : '0',
				vals:{
					'0':'Hide',
					'1':'Show'
				}
			},
			dim:{ desc:'Screen Dimmer', title:'Add a shadow to the rest of the site so the image (or script content) gets a better focus',
				def: '0',
				vals:{
					'0':'Disabled',
					'S':'Focus script content',
					'I':'Focus image'
				}
			},

			_grp_border:{ desc: 'Border', title:'Space to leave around the image (affects AutoScroll and AutoZoom)' },
			bordex:{ desc:'Horizontal border', title:'Extra pixels to the left/right of the image',
				def: defaultSettings.borderLR },
			bordey:{ desc:'Vertical border', title:'Extra pixels to the top/bottom of the image',
				def: defaultSettings.borderUD },

			_grp_cursor:{ desc:'Cursors', title:'Change the cursor according to the current state' },
			chcursor_img:{ desc:'Change over image', title:'Enable/Disable this to see a different cursor over the image depending on the state, or always the same one',
				def:'1',
				vals:{
					'0':'Disabled',
					'1':'Enabled'
				}
			},
			chcursor_btns:{ desc:'Change over buttons', title:'Enable/Disable this to see a different cursor over the back/next buttons depending on the state, or always the same one',
				def:'1',
				vals:{
					'0':'Disabled',
					'1':'Enabled'
				}
			},
			cursor_back:{ desc:'Previous page', title:'Cursor for the previous page', def:'1', vals: cursores },
			cursor_next:{ desc:'Next page', title:'Cursor for the next page', def:'2', vals: cursores },
			cursor_loading:{ desc:'Loading', title:'Cursor for when the next page is loading', def:'progress', vals: cursores },
			cursor_nolink:{ desc:'No link', title:'Cursor for when there is no next page', def:'not-allowed', vals: cursores },
			cursor_noimg:{ desc:'No image', title:'Cursor for when there is a next page but it has no image', def:'pointer', vals: cursores },
			cursor_custom_3:{ desc:'Custom cursor #1', title:'Custom image to use in the above options, either as an url or base64 (suggested size of 32x32 px, hotspot is at 16,16)'},
			cursor_custom_4:{ desc:'Custom cursor #2', title:'Custom image to use in the above options, either as an url or base64 (suggested size of 32x32 px, hotspot is at 16,16)'}
		};

		var divsets = document.createElement('div');
		divsets.id = 'wcr_settings';
		divsets.style.textAlign = 'center';
		divsets.innerHTML =
			'<div style="position:fixed; z-index:232322; background:#000; top:0; left:0; right:0; bottom:0; opacity:0.8;"></div>'+
			'<div id="wcr_settings_popup" style="position:absolute; left:50%; z-index:232323; background-color:#fff; color:#000; padding: 20px;">'+
				'<div id="wcr_settings_links">'+
					'<span class="wcr_general">General</span> | '+
					'<span class="wcr_layout">Graphic settings</span> | '+
					'<span class="wcr_sitio">Site settings</span> | '+
					'<span class="wcr_teclas">Keyboard shortcuts</span>'+
					(GM_xmlhttpRequest ? ' | <span class="wcr_updater">Updater</span>' : '')+
				'</div><hr/>'+
				'<div id="wcr_settings_content" style="text-align:left">'+
					'<div class="wcr_general">'+htmlLayout(opsGeneral, 'general')+'</div>'+
					'<div class="wcr_layout">'+htmlLayout(opsLayout, 'layout')+'</div>'+
					'<div class="wcr_sitio">'+htmlSitio(propsSitio)+'</div>'+
					'<div class="wcr_teclas">'+htmlTeclas(teclas)+'</div>'+
					(GM_xmlhttpRequest ? '<div class="wcr_updater">'+htmlUpdater(tiposUp)+'</div>' : '')+
				'</div><hr/>'+
				'<div>'+
					'Import / Export '+
					'<select id="wcr_set_sel_impexp">'+
						'<option value="">data for '+dominioData()+'</option>'+
						'<option value="default">default settings</option>'+
						'<option value="all">ALL data</option>'+
					'</select> '+
					'<button id="wcr_set_btn_impexp">GO</button> - '+
					'Reset '+
					'<select id="wcr_set_sel_reset">'+
						'<option value="">data for '+dominioData()+'</option>'+
						'<option value="default">default settings</option>'+
						'<option value="all">ALL data</option>'+
					'</select> '+
					'<button id="wcr_set_btn_reset">GO</button>'+
				'</div><br/>'+
				'<div>'+
					'<button id="wcr_set_btn_guardar">Save</button> '+
					'<button id="wcr_set_btn_aplicar">Apply</button> '+
					'<button id="wcr_set_btn_cancelar">Cancel</button>'+
				'</div>'+
			'</div>'+
			'<style>'+
				'#wcr_settings_popup *{color:#000;}'+
				'#wcr_settings_popup input, #wcr_settings_popup select, #wcr_settings_popup textarea{background-color:#fff;}'+
				'#wcr_settings_links span{cursor:pointer; text-decoration:underline;}'+
				'div{position:static; float:none;}'+
				'#wcr_settings [title]{cursor:help;}'+
				'#wcr_settings tr:nth-of-type(odd){background-color:#fff; color:#000;}'+
				'#wcr_settings tr:nth-of-type(even){background-color:#eef; color:#000;}'+
				'#wcr_settings tr.wcr_settings_group{background-color:#ccf; color:#000; text-align:center; font-style:italic;}'+
				'.wcr_settings_group td:nth-of-type(1):not([colspan]){background-color:#fff;}'+
			'</style>';
		document.body.appendChild(divsets);

		initLayout(opsGeneral, 'general');
		initLayout(opsLayout, 'layout');
		initSitio(propsSitio);
		initTeclas(teclas);
		if(GM_xmlhttpRequest) initUpdater(tiposUp);

		//setear eventos para tabs/guardar/cancelar
		var tabs = xpath('//div[@id="wcr_settings_links"]/span', document, true);
		for(var i=0; i<tabs.length; i++)
			setEvt(tabs[i], 'click', function(evt){
				cambiarTabSettings(evt.target.className);
			});

		for(var o in opsGeneral) opsLayout[o] = opsGeneral[o];
		setEvt('wcr_set_btn_guardar', 'click', function(){
			if(guardarSettings(teclas, propsSitio, tiposUp, opsLayout)){
				redirect(link[posActual]);
			}
		});
		setEvt('wcr_set_btn_aplicar', 'click', function(){
			guardarSettings(teclas, propsSitio, tiposUp, opsLayout);
		});
		setEvt('wcr_set_btn_cancelar', 'click', function(){
			document.body.removeChild(divsets);
		});
		setEvt('wcr_set_btn_impexp', 'click', function(){
			if(confirm('Save the changes?')) guardarSettings(teclas, propsSitio, tiposUp, opsLayout);

			var dominio = get('wcr_set_sel_impexp').value;
			var data = dominio == 'all' ?
				GM_getValue('wcr.settings', '') :
				JSON.stringify(getData('', '', dominio));
			var resp = prompt(
				'Copy this and save it somewhere to export your settings.\n' +
				'Replace this with your saved settings to restore them.', data);
			if(resp && resp != data && confirm('Are you sure you want to replace your current settings?')){
				try{
					var nuevaData = JSON.parse(resp);
					if(dominio == 'all') GM_setValue('wcr.settings', resp);
					else setData('', nuevaData, dominio);
					alert('Settings updated successfully');
					redirect(link[posActual]);
				}
				catch(e){
					alert('Error parsing the settings, nothing has been changed');
				}
			}
		});
		setEvt('wcr_set_btn_reset', 'click', function(){
			var msgConfirm = 'This will reset all data for '+dominioData()+': graphic options, bookmarks, and last visited page.\nYou may want to export and backup your settings first...\n\nAre you sure you want to delete this data?';
			var msgOK = 'All settings for '+dominioData()+' cleared';
			var dominio = get('wcr_set_sel_reset').value;
			if(dominio == 'all'){
				msgConfirm = 'This will reset EVERYTHING to the default settings, and all data will be lost for all sites.\nYou may want to export and backup your settings first...\n\nAre you REALLY sure you want to do delete this data?';
				msgOK = 'Everything is gone... everything...\n\n\n\n...forever';
			}
			else if(dominio == 'default'){
				msgConfirm = 'This will reset all the default graphic options, keyboard shortcuts and autoupdater settings.\nYou may want to export and backup your settings first...\n\nAre you sure you want to do delete this data?';
				msgOK = 'All default settings cleared';
			}

			if(confirm(msgConfirm)){
				if(dominio == 'all') GM_deleteValue('wcr.settings');
				else delData('', dominio);
				alert(msgOK);
				redirect(link[posActual]);
			}
		});

		cambiarTabSettings(tabSettingActual);
	}
	catch(e){
		alert('Error while initializing the settings window: ' + e);
		if(get('wcr_settings')) document.body.removeChild(get('wcr_settings'));
	}
}

//inicializar los valores y eventos de layout
function initLayout(ops, nombre){
	for(var o in ops){
		if(!o.indexOf('_')) continue;
		var id = 'wcr_sel_layout_'+o;
		var val = getData(o, '');
		var valdef = getData(o, ops[o].def || '', 'default');

		if(!o.indexOf('scroll')){
			if(typeof(val)=='number'){
				get('wcr_sel_layout__offset_'+o).value = val<0 ? -val : val;
				if(o=='scrollx') val = val>0 ? 'L' : 'R';
				else val = val>0 ? 'D' : 'U';
			}
			if(typeof(valdef)=='number'){
				get('wcr_sel_layout__offset_'+o+'_def').value = valdef<0 ? -valdef : valdef;
				if(o=='scrollx') valdef = valdef>0 ? 'L' : 'R';
				else valdef = valdef>0 ? 'D' : 'U';
			}
		}

		get(id).value = val;
		get(id+'_def').value = valdef;

		if(!o.indexOf('cursor_custom_')){
			setEvt(id+'_def', 'mouseover', function(evt){
				evt.target.style.cursor = cursorUrl(evt.target.value);
			});
			setEvt(id, 'mouseover', function(evt){
				evt.target.style.cursor = cursorUrl(evt.target.value);
			});
		}
		else if(!o.indexOf('cursor_')){
			setEvt(id+'_def', 'mouseover', function(evt){
				evt.target.style.cursor = confCursor(null, null, evt.target.value);
			});
			setEvt(id, 'mouseover', function(evt){
				evt.target.style.cursor = confCursor(null, null, evt.target.value || get(evt.target.id+'_def').value);
			});
		}
	}
}

//inicializar los valores y eventos del sitio
function initSitio(props){
	var lista = getConfPagina('lista');
	var selConf = get('wcr_sel_confpag');
	for(var i=0; i<lista.length; i++){
		selConf.innerHTML +=
			'<option value="'+escape(lista[i])+'">'+
				(lista[i][0]=='d'?'(default) ':'(custom) ')+
				lista[i].substr(3)+
			'</option>';
	}
	if(!lista.length){
		selConf.innerHTML +=
			'<option value="">Default settings</option>';
	}

	setEvt('wcr_btn_delconfpag', 'click', function(evt){
		if(!confirm('Are you sure you want to delete these settings?')) return;

		var customs = getData('confpags', {}, 'custompages');
		var nombre = unescape(get('wcr_sel_confpag').value);
		delete customs[nombre];
		setData('confpags', customs, 'custompages');
		if(getData('confpag') == nombre) delData('confpag');

		var selConf = get('wcr_sel_confpag');
		selConf.removeChild(selConf.options[selConf.selectedIndex]);
		if(selConf.options.length == 2){
			selConf.innerHTML += '<option value="">Default settings</option>';
		}
		selConf.selectedIndex = selConf.options.length-1;
		initValoresSitio(props, selConf.value);
	});

	setEvt('wcr_btn_editconfpag', 'click', function(evt){
		selConf.selectedIndex = 0;
		initValoresSitio(props, selConf.value);
	});

	for(var p in props){
		var seltipo = get('wcr_sitio_tipo_'+p);
		setEvt(seltipo, 'change', function(evt){
			cambiaTipo(evt.target);
		});
	}

	var confActual = initValoresSitio(props, getData('confpag', ''));

	selConf.value = escape(confActual);
	setEvt(selConf, 'change', function(evt){
		initValoresSitio(props, unescape(evt.target.value));
	});

	setEvt('wcr_btn_add_extra', 'click', function(evt){
		var p = 'extra_'+Number(new Date());
		trExtraConfSitio(p, props.extra);
		var seltipo = get('wcr_sitio_tipo_'+p);
		cambiaTipo(seltipo);
	});
}

//rellena la tabla de conf del sitio con los valores de una conf especifica
function initValoresSitio(props, conf){
	var pag = null;
	if(conf != 'new'){ //si es nuevo me quedo con los valores q ya estaban
		pag = getConfPagina(conf);

		for(var p in props){
			if(p=='extra'){// es un arreglo, meterse a cada uno
				try{
					var extrasViejos = xpath('//tr[@class="wcr_extras"]', document, true);
					for(var i=0; i<extrasViejos.length; i++) extrasViejos[i].parentNode.removeChild(extrasViejos[i]);
				}catch(e){}

				if(pag && pag[p]){
					for(i=0; i<pag[p].length; i++){
						var p2 = p+'_'+i;
						trExtraConfSitio(p2, props[p]);
						var seltipo = get('wcr_sitio_tipo_'+p2);
						rellenarValores(pag[p][i], p2, seltipo);
						cambiaTipo(seltipo);
					}
				}
			}
			else{
				seltipo = get('wcr_sitio_tipo_'+p);
				rellenarValores(pag ? pag[p] : undefined, p, seltipo);
				cambiaTipo(seltipo);
			}
		}
	}

	get('wcr_btn_delconfpag').style.display = (pag && pag.nombre && pag.nombre[0]=='c') ? '' : 'none';
	get('wcr_btn_editconfpag').style.display = (pag && pag.nombre && pag.nombre[0]=='d') ? '' : 'none';

	var dis = conf=='dis' || conf=="" || (pag && pag.nombre && pag.nombre[0]=='d');
	var inputs = xpath('//table[@id="wcr_sitio_tabla"]//input | //table[@id="wcr_sitio_tabla"]//textarea | //table[@id="wcr_sitio_tabla"]//select', document, true);
	for(i=0; i<inputs.length; i++){
		var inp = inputs[i];
		inp.disabled = dis;
		inp.style.backgroundColor = dis ? '#eee' : '#fff';
	}
	var botones = xpath('//table[@id="wcr_sitio_tabla"]//button', document, true);
	for(i=0; i<botones.length; i++){
		botones[i].disabled = dis;
	}

	return pag ? pag.nombre : conf;

	function rellenarValores(valor, p, seltipo){
		try{
			var base = 'wcr_sitio_valor_'+p;

			//si no existe la conf para esta pag/prop rellenar con default
			if(valor===undefined){
				seltipo.value = 'def';
				if(seltipo.value != 'def'){
					seltipo.value = 'str';
					get(base+'_str_val').value = '';
				}
			}
			else{
				if(p=='url' && typeof(valor)!='string' && !isArray(valor)) valor = [valor];

				//tipos: str, re, xp, fn, bool, num?
				switch(typeof(valor)){
					case 'string': //str
						seltipo.value = 'str';
						get(base+'_str_val').value = valor;
						break;
					case 'object': //xp, css o re
						if(typeof(valor[0]) == 'string'){ //xp
							seltipo.value = 'xp';
							get(base+'_xp_val').value = valor[0];
							if(get(base+'_xp_arr'))
								get(base+'_xp_arr').value = valor.length>1 ? '1' : '';
							if(valor.length>1)
								get(base+'_xp_glue').value = valor[1];
							if(valor.length>2)
								get(base+'_xp_first').value = valor[2];
							if(valor.length>3)
								get(base+'_xp_last').value = valor[3];
						}
						else if(isArray(valor[0])){ //css
							valor = valor[0];
							seltipo.value = 'css';
							get(base+'_css_val').value = valor[0];
							if(get(base+'_css_arr'))
								get(base+'_css_arr').value = valor.length>1 ? '1' : '';
							if(valor.length>1)
								get(base+'_css_glue').value = valor[1];
							if(valor.length>2)
								get(base+'_css_first').value = valor[2];
							if(valor.length>3)
								get(base+'_css_last').value = valor[3];
						}
						else{ //re
							seltipo.value = 're';
							get(base+'_re_val').value = valor[0];
							if(valor.length>1)
								get(base+'_re_grp').value = valor[1];
						}
						break;
					case 'function': //fn
						seltipo.value = 'fn';
						//sacar el "^func..{" y el "}$"
						var fn = valor.toString();
						fn = fn.replace(/^.+?\{(\s*[\r\n]+)*|\s*\}$/g, '');
						fn = fn.replace(new RegExp('^' + fn.match(/^\s*/), 'mg'), '');
						get(base+'_fn_val').innerHTML = fn;
						break;
					case 'boolean':
						seltipo.value = 'bool';
						get(base+'_bool_val').value = valor;
						break;
					case 'number':
						seltipo.value = 'num';
						get(base+'_num_val').value = valor;
						break;
				}
			}
		}
		catch(e){ error('rellenarSitio.'+p+': '+e); }
	}
}

//mostrar los inputs q corresponden y esconder los q no al cambiar el tipo de selector para una prop de la conf de un sitio
function cambiaTipo(sel){
	var clave = sel.id.substr('wcr_sitio_tipo_'.length), tipo = sel.value;
	var elems = xpath('//*[starts-with(@id,"wcr_sitio_valor_'+clave+'")]', document, true);
	for(var i=0; i<elems.length; i++)
		elems[i].style.display = elems[i].id.indexOf('_'+tipo)>0 ? '' : 'none';
}

//inicializar los valores y eventos de las teclas
function initTeclas(teclas){
	var input, inputaux, hiddens = ['keyCode', 'ctrlKey', 'shiftKey', 'altKey'];
	teclado = getTeclas(); //por si me cambiaron la conf desde otra pag
	for(var t in teclas){
		var teclasAlternativas = teclado[t] || [{}];
		if(!isArray(teclasAlternativas)) teclasAlternativas = [teclasAlternativas];
		for(var i=0; i<2; i++){
			input = get('wcr_tecla_'+i+'_'+t);
			var tecla = teclasAlternativas[i] || {};
			input.value = tecla.name || '';

			for(var h=0; h<hiddens.length; h++){
				inputaux = document.createElement('input');
				inputaux.type = 'hidden';
				inputaux.id = input.id + '_' + hiddens[h];
				inputaux.value = tecla[hiddens[h]] || 'false';
				input.parentNode.insertBefore(inputaux, input);
			}

			setEvt(input, 'keydown', function(evt){
				if(evt.keyCode >= 16 && evt.keyCode <= 18 || evt.keyCode == 27) return; //ctrl/shift/alt o ESC (funca raro)
				
				if(evt.keyCode == 8){ //BACKSPACE, dejo la accion sin tecla
					for(var h=0; h<hiddens.length; h++)
						get(evt.target.id+'_'+hiddens[h]).value = '';
					evt.target.value = '';
				}
				else{
					for(h=0; h<hiddens.length; h++)
						get(evt.target.id+'_'+hiddens[h]).value = evt[hiddens[h]];
					evt.target.value = nombreTecla(evt);
				}
				evt.stopPropagation();
				evt.preventDefault();
			});
			setEvt(input, 'keypress', function(evt){
				if(evt.keyCode != 8)
					evt.target.value = nombreTecla(evt);
				evt.stopPropagation();
				evt.preventDefault();
			});
		}
	}
}

//inicializar los valores y eventos del updater
function initUpdater(tiposUp){
	get('wcr_dias_update').value = getData('updateDays', 1, 'default');
	get('wcr_accion_update').value = getData('updateAction', 0, 'default');
	var tipoUpdate = getData('updateFlags', (1<<16)-1, 'default');
	for(t in tiposUp) get('wcr_cb_tipo_update_'+t).checked = tipoUpdate & t;
	var ultimoUpdate = Number(GM_getValue('SUC_last_update', '0'));
	if(ultimoUpdate) get('wcr_fecha_update').innerHTML = new Date(ultimoUpdate);
	setEvt('wcr_btn_check_update', 'click', function(){
		updateCheck(true);
		get('wcr_fecha_update').innerHTML = new Date();
	});
}

//generar el html de la conf del layout
function htmlLayout(ops, nombre){
	var html =
		'<table id="wcr_'+nombre+'_tabla">'+
			'<tr class="wcr_settings_group">'+
				'<td></td>'+
				'<td>Default settings</td>'+
				'<td>Settings for '+document.location.host.replace(/^www\./, '')+'</td>'+
			'</tr>';
	for(var o in ops){
		var op = ops[o];
		if(!o.indexOf('_grp_')){
			html +=
				'<tr class="wcr_settings_group">'+
					'<td colspan="3" title="'+(op.title || '')+'">'+op.desc+'</td>'+
				'</tr>';
		}
		else{
			var opts = '';
			if(op.vals) for(var v in op.vals){
				opts += '<option value="'+v+'"'+
					(o.indexOf('cursor_') ? '' : (' style="cursor:'+confCursor(null, null, v)+'"'))+
					'>'+op.vals[v]+'</option>';
			}

			html +=
				'<tr>'+
					'<td title="'+(op.title || '')+'">'+op.desc+'</td>'+
					'<td>'+ (op.vals ?
						('<select id="wcr_sel_layout_'+o+'_def">'+opts+'</select>') :
						('<input id="wcr_sel_layout_'+o+'_def"/>')
					)+'</td>'+
					'<td>'+ (op.vals ?
						('<select id="wcr_sel_layout_'+o+'">'+
							'<option value="">Use default settings</option>'+opts+
						'</select>') :
						('<input id="wcr_sel_layout_'+o+'" title="leave empty to use default settings"/>')
					)+'</td>'+
				'</tr>';
		}
	}
	html += '</table>';
	//poder esconder divs/botones? (first/last, bookmarks, last visited, toggle layout)
	//si se esconden cosas, asegurarse q no falle al tratar de usarlas

	return html;
}

//generar el html de la conf del sitio
function htmlSitio(props){
	var html =
		'<div>Current site settings: '+
			'<select id="wcr_sel_confpag">'+
				'<option value="new">New custom settings</option>'+
				'<option value="dis">Disable '+document.location.host.replace(/^www\./, '')+'</option>'+
			'</select>'+
			'<button id="wcr_btn_editconfpag">Edit</button>'+
			'<button id="wcr_btn_delconfpag">Delete</button>'+
		'</div><br/><table id="wcr_sitio_tabla">';
	for(var p in props){
		html += '<tr id="wcr_tr_sitio_'+p+'"><td title="'+(props[p].title || '')+'">'+props[p].desc+'</td>';
		if(p=='extra') html += '<td><button id="wcr_btn_add_extra">Add extra content</button></td><td/></tr>';
		else{
			var tds = tdsConfSitio(p, props[p]);
			html += '<td>'+tds[0]+'</td><td style="width:400px">'+tds[1]+'</td></tr>';
		}
	}
	html += '</table><br/>Hover over a textbox for its meaning and an explanation on how to use it<br/><br/>For a detailed guide on adding new sites, check <a href="http://userscripts.org/topics/86377#posts-380342">this thread</a> in the script site';
	/*todo:
		agregar los tests
			4° td con boton test y un tr invisible abajo para el resultado
			requestear link[posActual] y aplicarle ese getter
		poder exportar/importar esta cosa
			poder exportar este sitio o todos los customs
			para mergear repetidos preguntar si quedarse con el actual o el importado
	*/

	return html;
}

//retorna los innerhtmls de los tds para especificar el contenido
function tdsConfSitio(p, prop){
	var tds = ['', ''];
	for(var t in prop.tipos) tds[0] += '<option value="'+t+'">'+prop.tipos[t].desc+'</option>';
	tds[0] = '<select id="wcr_sitio_tipo_'+p+'">'+tds[0]+'</select>';
	for(t in prop.tipos) for(var v in prop.tipos[t]){
		if(v=='desc') continue;
		tds[1] += '<'+prop.tipos[t][v].elem+' id="wcr_sitio_valor_'+p+'_'+t+'_'+v+'"';
		for(var a in prop.tipos[t][v]) if(a!='elem' && a!='html') tds[1] += ' '+a+'="'+prop.tipos[t][v][a]+'"';
		tds[1] += prop.tipos[t][v].html ? '>'+prop.tipos[t][v].html+'</'+prop.tipos[t][v].elem+'>' : (prop.tipos[t][v].elem == 'textarea' ? '></textarea>' : '/>');
	}
	return tds;
}

//insertar un tr para agregar mas contenido extra
function trExtraConfSitio(p, prop){
	var tr = document.createElement('tr');
	tr.className = 'wcr_extras';
	tr.id = 'wcr_tr_sitio_'+p;
	var tds = [
		document.createElement('td'),
		document.createElement('td'),
		document.createElement('td')];
	var tdsConf = tdsConfSitio(p, prop);
	tds[0].innerHTML =
		'<div style="float:right">'+
			'<button id="wcr_btn_up_'+p+'">/\\</button>'+
			'<button id="wcr_btn_down_'+p+'">\\/</button>'+
			'<button id="wcr_btn_del_'+p+'">Delete</button>'+
		'</div>';
	tds[1].innerHTML = tdsConf[0];
	tds[2].innerHTML = tdsConf[1];
	tr.appendChild(tds[0]);
	tr.appendChild(tds[1]);
	tr.appendChild(tds[2]);

	var trAfterExtra = get('wcr_tr_sitio_xelem');
	trAfterExtra.parentNode.insertBefore(tr, trAfterExtra);

	var seltipo = get('wcr_sitio_tipo_'+p);
	setEvt(seltipo, 'change', function(evt){
		cambiaTipo(evt.target);
	});
	setEvt('wcr_btn_del_'+p, 'click', function(evt){
		var tr = evt.target.parentNode.parentNode.parentNode;
		tr.parentNode.removeChild(tr);
	});
	setEvt('wcr_btn_up_'+p, 'click', function(evt){
		var tr = evt.target.parentNode.parentNode.parentNode;
		var otro = tr.previousSibling;
		if(otro.id.indexOf('wcr_tr_sitio_extra_')==0){
			tr.parentNode.insertBefore(tr, otro);
		}
	});
	setEvt('wcr_btn_down_'+p, 'click', function(evt){
		var tr = evt.target.parentNode.parentNode.parentNode;
		var otro = tr.nextSibling;
		if(otro.id.indexOf('wcr_tr_sitio_extra_')==0){
			tr.parentNode.insertBefore(otro, tr);
		}
	});
}

//generar el html de la conf del teclado
function htmlTeclas(teclas){
	var html = '<table id="wcr_teclas_tabla">'+
			'<tr class="wcr_settings_group">'+
				'<td/>'+
				'<td>Key</td>'+
				'<td>Alternate Key</td>'+
			'</tr>';
	for(var t in teclas)
		html +=
			'<tr>'+
				'<td title="'+teclas[t][1]+'">'+teclas[t][0]+'</td>'+
				'<td><input id="wcr_tecla_0_'+t+'"/></td>'+
				'<td><input id="wcr_tecla_1_'+t+'"/></td>'+
			'</tr>';
	html += '</table><br/>Press BackSpace to unset a key';

	return html;
}

//generar el html de la conf del updater
function htmlUpdater(tiposUp){
	var html =
		'<div>Automatically check for updates every <input id="wcr_dias_update" size="3" /> days (0 = never)</div>'+
		'<div>When an update is found <select id="wcr_accion_update" >'+
			'<option value="0">ask and take me to the main page on userscripts.org</option>'+
			(isFirefox() ? '<option value="1">ask and directly download the latest version</option>' : '')+
			'<option value="2">don\'t ask and take me to the main page on userscripts.org</option>'+
			(isFirefox() ? '<option value="3">don\'t ask and directly download the latest version</option>' : '')+
		'</select></div>'+
		'<div id="wcr_tipos_update"><br/>Check for the following kind of updates:<br/>';
	for(t in tiposUp)
		html +=
			'<input type="checkbox" id="wcr_cb_tipo_update_'+t+'" value="'+t+'">'+
			'<label for="wcr_cb_tipo_update_'+t+'">'+tiposUp[t]+'</label><br/>';
	html +=
		'</div><br/>Last check: <span id="wcr_fecha_update">Never</span><br/>'+
		'<button id="wcr_btn_check_update">Check for updates now</button>';

	return html;
}

//guardar todo lo de las pantallas de configuracion
function guardarSettings(teclas, props, tiposUp, opsLayout){
	try{
		//guardar teclas
		var hiddens = ['keyCode', 'ctrlKey', 'shiftKey', 'altKey'];
		for(var t in teclas){
			teclado[t] = [];
			for(var i=0; i<2; i++){
				teclado[t][i] = {
					name: get('wcr_tecla_'+i+'_'+t).value,
					keyCode: get('wcr_tecla_'+i+'_'+t+'_keyCode').value
				};
				for(var h=1; h<hiddens.length; h++)
					teclado[t][i][hiddens[h]] = get('wcr_tecla_'+i+'_'+t+'_'+hiddens[h]).value == 'true';
			}
		}
		setData('teclas', teclado, 'default');

		//guardar layout
		for(var o in opsLayout){
			if(!o.indexOf('_')) continue;

			var valdef = get('wcr_sel_layout_'+o+'_def').value;
			var val = get('wcr_sel_layout_'+o).value;

			if(o.indexOf('prefetch_')<0 || valdef.match(/^\d+$/) && Number(valdef)>0)
				setData(o, valdef, 'default');

			if(o.indexOf('prefetch_')<0 || val === '' || val.match(/^\d+$/) && Number(val)>0){
				if(val != '') setData(o, val);
				else delData(o);
			}
		}

		//guardar updater
		if(GM_xmlhttpRequest){
			var dias = Number(get('wcr_dias_update').value);
			if(!isNaN(dias) && dias>=0) setData('updateDays', dias, 'default');
			setData('updateAction', Number(get('wcr_accion_update').value), 'default');
			var tipoUpdate = 0;
			for(t in tiposUp) if(get('wcr_cb_tipo_update_'+t).checked) tipoUpdate += Number(t);
			setData('updateFlags', tipoUpdate, 'default');
		}

		//guardar sitio
		var conf = unescape(get('wcr_sel_confpag').value);
		if(conf == '' || conf[0]=='d') setData('confpag', conf);
		else{ //es new o un custom
			var ok = true;
			var tipourl = get('wcr_sitio_tipo_url').value;
			var nombre = 'c'+tipourl[0]+':'+get('wcr_sitio_valor_url_'+tipourl+'_val').value;
			var customPag = {};
			for(var p in props){
				if(p=='extra'){
					try{
						var xx = [];
						var extras = selCss('tr.wcr_extras', document, true);
						for(i=0; i<extras.length; i++){
							try{
								var p2 = extras[i].id.match(/extra_\d+$/)[0];
								var x = parsearElementoConfSitio(p2);
								if(x) xx.push(x);
							}catch(e){ ok = false; }
						}
						customPag[p] = xx;
					}catch(e){}
				}
				else{
					try{
						x = parsearElementoConfSitio(p);
						if(x) customPag[p] = x;
					}catch(e){ ok = false; }
				}
			}

			if(!ok) return false;

			var customs = getData('confpags', {}, 'custompages');
			if(conf[0]=='c' && conf!=nombre) delete customs[conf];
			customs[nombre] = customPag;
			setData('confpags', customs, 'custompages');
			setData('confpag', nombre);
		}
	}catch(e){
		alert('Error saving the settings: ' + e);
		return false;
	}
	return true;
}

//leer la configuracion ingresada en los inputs y convertirla en {tipo, valor}
function parsearElementoConfSitio(p){
	var ok = true;
	var tipo = get('wcr_sitio_tipo_'+p).value;
	if(tipo == 'def') return false;
	var valor;
	var elems = xpath('//*[starts-with(@id,"wcr_sitio_valor_'+p+'_'+tipo+'")]', document, true);

	//tipos: str, re, xp, fn, bool, num?
	switch(tipo){
		case 'str':
			valor = elems[0].value;
			break;
		case 're':
			valor = [];
			try{
				var re;
				if(!elems[0].value.match(/^\/.+\/[gmi]*$/)) elems[0].value = '/'+elems[0].value+'/';
				eval('re = '+elems[0].value);
				var tipore = Object.prototype.toString.call(re);
				if(tipore != "[object RegExp]") throw tipore;
				valor.push(elems[0].value);
			}catch(e){
				alert(p+': "'+elems[0].value+'" is not a valid regular expression ('+e+')');
				ok = false;
			}
			if(elems.length>1){
				if(!elems[1].value.match(/^\d+$/) || Number(elems[1].value)==0){
					alert(p+': "'+elems[1].value+'" is not a valid number');
					ok = false;
				}
				else valor.push(Number(elems[1].value));
			}
			break;
		case 'xp':
		case 'css':
			valor = [elems[0].value];
			if(elems[1] && elems[1].value){ //si es arreglo...
				valor.push(elems[2].value);
				if(elems[4].value && !elems[3].value) elems[3].value = '0';
				if(elems[3].value){
					var num = Number(elems[3].value);
					if(!elems[3].value.match(/^[-\d]+$/) || isNaN(num)){
						alert(p+': "'+elems[3].value+'" is not a valid number');
						ok = false;
					}
					else valor.push(num);
				}
				if(elems[4].value){
					num = Number(elems[4].value);
					if(!elems[4].value.match(/^[-\d]+$/) || isNaN(num)){
						alert(p+': "'+elems[4].value+'" is not a valid number');
						ok = false;
					}
					else valor.push(num);
				}
			}
			if(tipo=='css') valor = [valor];
			break;
		case 'fn':
			valor =
				xpath('//select[@id="wcr_sitio_tipo_'+p+'"]/option[@value="fn"]').innerHTML+'{'+
				elems[0].value + '}';
			try{ eval('f='+valor); }
			catch(e){
				alert(p+': "'+valor+'" is not a valid function ('+e+')');
				ok = false;
			}
			break;
		case 'bool':
			valor = elems[0].value == 'true';
			break;
		case 'num':
			valor = Number(elems[0].value);
			if(isNaN(valor)){
				alert(p+': "'+elems[0].value+'" is not a valid number');
				ok = false;
			}
			break;
	}

	if(p=='url'){
		if(!valor){
			alert('url: this field is obligatory');
			ok = false;
		}
		else{
			if(tipo=='str') re = strToRegexp(valor);
			else eval('re = '+elems[0].value);
			if(!document.location.href.match(re)){
				alert('url: the expression '+elems[0].value+' doesn\'t match the current URL');
				ok = false;
			}
		}
	}
	if(!ok) throw 'error';

	return {tipo: tipo, valor: valor};
}

//esconder los otros tabs y mostrar el q corresponde
function cambiarTabSettings(nombre){
	var tabs = xpath('//div[@id="wcr_settings_content"]/div', document, true);
	for(var i=0; i<tabs.length; i++) tabs[i].style.display = 'none';

	xpath('//div[@class="'+nombre+'"]').style.display = '';
	var spans = xpath('//div[@id="wcr_settings_links"]/span', document, true);
	for(i=0; i<spans.length; i++){
		spans[i].style.fontWeight = 'normal';
		spans[i].style.backgroundColor = '';
	}
	var span = xpath('//span[@class="'+nombre+'"]');
	span.style.fontWeight = 'bold';
	span.style.backgroundColor = '#ff0';

	//setear el porte y posicion
	var popup = get('wcr_settings_popup');
	var top = document.documentElement.scrollTop;
	if(!top) top = document.body.scrollTop;
	popup.style.top = (top+10) + 'px';
	popup.style.marginLeft = -popup.offsetWidth/2 + 'px';

	tabSettingActual = nombre;
}

//busca la configuracion correspondiente a esta pagina
function getConfPagina(conf){
	try{
		var lista = conf=='lista';
		if(conf===undefined) conf = getData('confpag', '');
		if(conf == 'dis') return null;

		var url = document.location.href;
		var pags = [];
		var customs = getData('confpags', {}, 'custompages');

		if(conf && !lista){ //se quiere una especifica
			if(customs[conf]){
				var pu = conf.substr(3);
				if(conf[1] == 'r') eval('pu='+pu);
				else pu = strToRegexp(pu);

				if(url.match(pu)){
					var pag = parsearPaginaCustom(customs[conf]);
					pag.nombre = conf;
					return pag;
				}
			}
			else{
				for(var i = 0; i < paginas.length; i++){
					pag = paginas[i];
					pu = pag.url;
					pu = (typeof(pu)=='string' ? 'ds:' : 'dr:') + pu;
					if(pu == conf){
						pag.nombre = conf;
						return pag;
					}
				}
			}
			//no encontre la q me pidieron. si era la q tenia configurada, reseteo la conf
			//if(conf == getData('confpag', '')) delData('confpag');
		}

		//si no estaba configurada o no se encontro la conf q queria, busca primero en las customs
		for(var p in customs){
			pu = p.substr(3);
			if(p[1] == 'r') eval('pu='+pu);
			else pu = strToRegexp(pu);

			if(url.match(pu)){
				pag = parsearPaginaCustom(customs[p]);
				pag.nombre = p;
				if(!lista) return pag;
				pags.push(p);
			}
		}

		//si todavia no encuentro (o quiero la lista de todas las confs q matcheen) sigo buscando
		for(i = 0; i < paginas.length; i++){
			pag = paginas[i];
			pu = pag.url;
			if(typeof(pu)=='string') pu = strToRegexp(pu);

			if(url.match(pu)){
				p = (typeof(pag.url)=='string' ? 'ds:' : 'dr:') + pag.url;
				pag.nombre = p;
				if(!lista) return pag;
				pags.push(p);
			}
		}
		if(!lista) return {nombre:''};
		return pags;
	}
	catch(e){
		error('getconfpag: ' + e);
		return {};
	}
}

//para matchear una url, se convierte un valor en string a regexp
function strToRegexp(url){
	url = url.replace(/[-[\]{}()+?.,\\^$#\s]/g, "\\$&");
	url = url.replace(/\*\\\./g, '([\\w-]+\\.)?'); //'*.hola.com' matchea 'asd.hola.com' y 'hola.com', pero no 'chao.com/hola.com'
	url = url.replace(/\*/g, '.*');

	var urls = url.split('|');
	for(var j=0; j<urls.length; j++){
		if(!urls[j].match(/^https?:\/\//)){
			if(urls[j].match(/^[^.\/]+\\\.\w*(\/|$)/)) urls[j] = '(www\\.)?' + urls[j];
			urls[j] = '^https?://' + urls[j];
		}
		urls[j] = '('+urls[j]+')';
	}
	return new RegExp(urls.join('|'));
}

//recibe la pagina en el formato en q se guarda en la conf, y la retorna en el formato usado en paginas[i]
function parsearPaginaCustom(custom){
	var pag = {};
	for(var p in custom){
		if(p == 'extra'){
			var x = [];
			for(var i=0; i<custom[p].length; i++) x.push(parsearPropCustom(custom[p][i], p));
			pag[p] = x;
		}
		else pag[p] = parsearPropCustom(custom[p]);
	}
	return pag;
}

//leer una propiedad en formato jsoneable y dejarla en formato estandar
function parsearPropCustom(prop, p){
	var tipo = prop.tipo;
	var valor = prop.valor;
	switch(tipo){
		case 're':
			eval('valor[0] = '+valor[0]);
			if(p=='url') valor=valor[0];
			break;
		case 'fn':
			eval('valor = '+valor);
			break;
	}
	return valor;
}

//ver si usa el motor de chrome/safari
function isWebKit(){
	return navigator.userAgent.indexOf('WebKit/')>0;
}

//ver si usa el motor de firefox
function isFirefox(){
	return navigator.userAgent.indexOf('Gecko/')>0;
}

//pantalla de configuracion q sale cuando se habilita el zoom pero no esta configurado
function mostrarSettingsZoom(){
	try{
		var html = '';
		var cbs = {
			achw:	'Shrink wide images to fit in the width of the screen',
			achh:	'Shrink high images to fit in the height of the screen',
			agrw:	'Expand narrow images to use the width of the screen',
			agrh:	'Expand short images to use the height of the screen'
		};
		for(var p in cbs)
			html += '<input type="checkbox" id="wcr_set_cb_'+p+'"/> '+
				'<label for="wcr_set_cb_'+p+'">'+cbs[p]+'</label><br/>';

		var txts = {
			bordex:	'Pixels to leave as a border to the left and right',
			bordey:	'Pixels to leave as a border above and below the image'
		};
		for(p in txts) html += '<input id="wcr_set_txt_'+p+'" size="2"> '+txts[p]+'<br/>';

		html += '<br/><input type="checkbox" id="wcr_set_cb_def"/> '+
				'<label for="wcr_set_cb_def">Use these settings as the default for every site</label><br/>';

		var divsets = document.createElement('div');
		divsets.id = 'wcr_settings';
		divsets.style.textAlign = 'center';
		divsets.innerHTML =
			'<div style="position:fixed; z-index:232322; background:#000; top:0; left:0; right:0; bottom:0; opacity:0.8;"></div>'+
			'<div id="wcr_settings_popup" style="position:absolute; left:50%; z-index:232323; background-color:#fff; color:#000; padding: 20px;">'+
				'<div>How do you want the images to be fitted?</div><hr/>'+
				'<div id="wcr_settings_content" style="text-align:left">'+html+'</div><br/>'+
				'These (and more) settings can be changed later by clicking the "Settings" button<hr/>'+
				'<div>'+
					'<button id="wcr_set_btn_guardar" style="width:100%">Save settings</button><br/>'+
					'<button id="wcr_set_btn_disable">Disable script for this site</button>'+
				'</div>'+
			'</div>'+
			'<style>'+
				'#wcr_settings_popup *{color:#000;}'+
				'#wcr_settings_popup input, #wcr_settings_popup select, #wcr_settings_popup textarea{background-color:#fff;}'+
				'div{position:static; float:none;}'+
			'</style>';
		document.body.appendChild(divsets);

		//setear el porte y posicion
		var popup = get('wcr_settings_popup');
		var top = document.documentElement.scrollTop;
		if(!top) top = document.body.scrollTop;
		popup.style.top = (top+10) + 'px';
		popup.style.marginLeft = -popup.offsetWidth/2 + 'px';

		//inicializar los valores
		for(p in cbs){
			eval('var x = '+p);
			get('wcr_set_cb_'+p).checked = x;
		}

		setEvt('wcr_set_btn_guardar', 'click', function(){
			//guardar las confs y setear las variables
			var dom = get('wcr_set_cb_def').checked ? 'default' : undefined;
			for(var p in cbs){
				eval(p+' = '+get('wcr_set_cb_'+p).checked);
				setData(p, get('wcr_set_cb_'+p).checked ? 1 : 0, dom);
			}
			for(p in txts){
				var val = Number(get('wcr_set_txt_'+p).value);
				if(isNaN(val)) continue;
				eval(p+' = '+val);
				setData(p, val, dom);
			}
			document.body.removeChild(divsets);
			fitImagen();
			scrollear();
		});

		setEvt('wcr_set_btn_disable', 'click', function(){
			if(confirm('Are you sure you want to disable Webcomic Reader on this site?\n'+
				'(It can be re-enabled later with the Greasemonkey menu)')){
				setData('confpag', 'dis');
				redirect(link[posActual]);
			}
		});
	}
	catch(e){
		alert('Error while initializing the zoom settings window: ' + e);
		if(get('wcr_settings')) document.body.removeChild(get('wcr_settings'));
	}
}

run_script();
})();

/*
alert(
	0*1+ //'Bug fixes (Firefox)',
	0*2+ //'Bug fixes (Other browsers)',
	0*4+ //'New features',
	0*8+ //'New sites',
	0*16+ //'Fixes for old sites',
	0*32+ //'Graphic changes',
	0*64+ //'New options',
	0*128+ //???
	0
);
*/

/*todo:

	forma facil de extraer varias paginas a partir de un solo request (blogs, reddit, pags ajaxeadas, etc)
		el img tendria q recuperar una lista de resultados
		se agrega una funcion extra_context: function(html, pos, relpos) q retorna el contexto sobre el q se buscan los extras para cada item
		las urls se rellenarian con ##pos-relativa-a-la-pag
		los back/next buscan el link normalmente
		el prefetcheador avanza los n de una

	poder definir un contenedor para cada extra
		[v2] extras: {selector: [cosas, mascosas]}
	poder hacer extras fijos (se llenan una vez y no se buscan ni se tocan mas)
		[v2] agregar un contenedor de extras fijos, rellenarlo en el js o con extras: {contendorfijo: [function(html, pos){if(pos)return ''; return selector;}]}
	poder leer extras por ajax?
		function(){request sincrono}

	en site settings, boton para exportar a formato copypasteable al script

	opcion para definir cuantos links se precargan, separado de cuantas imagenes
		se precargan los puros html, y en un proceso aparte las imagenes
			cargo link, if(!cargandoimg) cargarimgs -> carga primera no cargada y sigue hasta la N
		select con las pags cargadas, diferenciando las con img lista
		cambiar condicion de img cargada para cambiar pag
			btnback y btnnext no avanzan si no se ha cargado la pag q viene
			saltar directo a una pag si funciona, y empieza a cargar las imgs alrededor
		cambiar condicion para sacar un img de las cargadas (actualmente mantiene la actual +-23)
	
	usar el doc magico para parsear las cosas ajaxeadas, asi no carga las imgs
		hacer q las funciones parseadoras reciban el html y el doc
		hacer una funcion htmlToDoc
		en vez de mantener solo las imgs en la cosa de imgs cargadas, agregar los extras

	next/prev chapter (+ teclas)

	soportar AMR en minimalistic?
		tener una lista de selectores "no borrar"
		para cada elemento "no borrar", agregarlo a una lista junto con sus ancestros
		para cada elemento de la lista, borrar todos los hermanos q no esten en la lista
		tb podria soportar el Greased Webcomic Manager

	cambiar la forma en q se graban los datos (el objeto actual crece mucho, el mio pesa 50kb)
		1 setting por sitio
		1 setting con lo default
		1 setting con la lista de todos los settings

	usar una variable "settings" q tenga toda la conf cargada, igual q defaultSettings
		reemplazar las variables random q se usan ahora
		usar los nombres q se usan para guardar
			mapear nombresCoherentes -> nombresGuardados

	rehacer el codigo OOPmente
		clase q maneje el script per se
		clase para la conf de una pag
		clase para los settings
		clase para la pantalla de settings

	poder listar todos los sitios q reviso de alguna forma
		al guardar ultima pag visitada, guardar: url, title, fecha, img.src y next
		lista con la pag y la ultima fecha q se reviso (à la GreasedWebcomicManager?)
			avisar q hay pag nueva si cambio el img.src o next
			boton para forzar q se revise una pag o todas las de la lista
			mostrar una estrella para las favoritas, clickeable para (des)favoritear
			poder deshabilitar sitios
		boton para cambiar entre ver todos/favoritos/no-favoritos
			checks para mostrar [favoritos], [no-favoritos], [deshabilitados], [nueva pag]
		boton para agregar/quitar de los favoritos
		boton para deshabilitar script en este sitio
		boton para forzar check de pag nueva en una/todas las pags
			solo checkea las q no tienen pag nueva
		tecla para pasar al sgte
		tecla para pasar a un random

	pagina "comics del dia"
		usar una pag especial para rehacerla (@include *wcr_latest_comics. en ffox about:blank?wcr_..., si no google.com/wcr_... (404))
		con las imagenes del dia de mis comics
		cada una con back/next chico (a los lados y/o con click en img)?
		mostrar solo las nuevas? (marcar como leidas?)
		tener al lado (escondida?) la lista completa de pags

	modo fullchapterloader
		mostrar todas las imagenes una bajo otra
		avanzar solo hacia adelante
		avanzar (posActual++, cargar mas pags...) al ir scrolleando
		mostrar las imagenes y el extra en un div
		poner los botones (settings/cambiar de modo) arriba
		mensaje al final cuando no queden mas pags (o link a la pag sin img)

	????: al ir para atras, revisar si el next es el mismo, y si no es cargarlo entremedio
		habria q ir shifteando todo para atras hasta llenar el hoyo... o algo asi... ta dificil...
		en vez de rellenar, avisar?

	????: borrar los extras de la pag 0?

	hacer mas facil la agregacion de sitios
		poder cambiar entre modo @include * on/off
			on: solo iniciar en las pags incluidas explicitamente (if(!getConfPag) break;)
			off: tratar de iniciar siempre (como ahora)
		configuracion de sitios
			4° columna con boton test
				en propsSitio tener un elemento test, puede ser una funcion o true para el default
				test default:
					convertir a getter y obtener contenido como string
					agregar tr con el resultado (td[1] "Test results:" align-right, td[2,3] contenido, td[4] boton hide)
			poder exportar/importar esta variable
				para mergear repetidos preguntar si quedarse con el actual o el importado
				poder exportar/importar todas las pags o solo esta
			poder importar desde otras paginas (foro de userscripts?)
				@include http://userscripts.org/topics/*
				persona random postea sus pags exportadas
				el script las encuentra y las hace clickeables, onclick se importan
			poder centralizar esto en una pagina? lemontecho? :P
				personas random suben sus settings
				se pueden mirar e importar
				tener una configuracion "oficial" mantenida por mi
					tener un autoupdater q baje esa version
		wizard para agregar sitios
			accesible desde el menu gm
			pide clickear la imagen y los links
			carga la pag anterior y sgte, y busca img/links q coincidan con los marcados
				buscar por atributos, patrones, etc?
			despues preguntar las cosas mas basicas
			pasar al editor de confs

	ir guardando los mensajes de los cambios de las versiones no notificadas?

	dejar el layout mas custom-ready-pa-lo-que-benga?
		arreglo de layouts
		funciones personalizadas para los "eventos" q modifican los botones
		en vez de boton "toggle", poner un select con los layouts

	agregar pags
		http://www.viruscomix.com/subnormality.html
		incluir subreddits en vez de todo reddit

		http://www.harrington-artwerkes.com/Lana5.htm
		http://eecomics.net/?strip_id=152
		http://www.shadowgirlscomic.com/comics/maxmachine-interface/
		http://www.pantheracomic.com/?p=214
		http://dimensiondust.blogspot.com/search?updated-max=2010-06-16T02%3A38%3A00-05%3A00&max-results=1
		http://www.joelcarroll.com/topaz/page-four/
		http://www.yoshcomic.com/latest.php?i=20101201
		http://agirlandherfed.com/1.833.html
		http://www.casualvillain.com/Unsounded/comic/ch02/ch02_27.html
		http://undertow.dreamshards.org/3/u3_13.html
		http://www.sisterclaire.com/comic/chapter-6-comic/chapter-6-the-trials/
		http://sarahzero.com/sz_0588.html
		http://www.colourofivy.com/annyseed_webcomic8.htm
		http://flakypastry.runningwithpencils.com/comic.php?strip_id=326

*/
