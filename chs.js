/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com
 @idle games : http://www.gityx.com
 @QQ Group : 627141737

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "Achievement Gotten!": "成就达成！",
    "If things feel slow, check your challenges!": "如果感觉进展缓慢，请检查您的挑战！",
    "A new layer already?": "已经有新层了？",
    "Another layer with M? This is getting out of hand": "另一层有M？ 这已经失控了",
    "Click!": "点击！",
    "FINALE": "决赛",
    "Haha! I did it! Oh, wait, no, there's still four more layers.": "哈哈！ 我做的！ 哦，等等，不，还有四层。",
    "Impossible?": "不可能？",
    "Nanoprestiges": "纳米声望",
    "Oh, so like ADHD?": "哦，像多动症？",
    "Only grindier from here": "从这里开始只有磨砺者",
    "Pretend I said something funny here": "假装我在这里说了一些有趣的话",
    "Slowdown": "减速",
    "To begin": "开始",
    "Ultraprestige for the first time. Makes Ultraprestiges boost production.": "第一次终极声望。 使 终极终极 提高产量。",
    "Small prestige for the first time. Makes Small Prestiges boost production.": "第一次小型声望。 使小型声望提高产量。",
    "Partial prestige for the first time. Makes Partial Prestiges boost production.": "第一次部分声望。 使部分声望提高产量。",
    "Hyperprestige for the first time. Makes Hyperprestiges boost production.": "第一次超级声望。 使 超级声望 提高产量。",
    "Full prestige for the first time. Makes Full Prestiges boost production.": "第一次全声望。 使 全声望 提高产量。",
    "Final prestige for the first time. Ends the game.": "第一次最终声望。 结束游戏。",
    "Microprestige for the first time. Makes Microprestiges boost production.": "第一次微型声望。 使 微型声望 提高产量。",
    "Miniprestige for the first time. Makes Miniprestiges boost production.": "第一次迷你声望。 使 迷你声望 提高产量。",
    "Multiprestige for the first time. Makes Multiprestiges boost production.": "第一次批量声望。 使 批量声望提高产量。",
    "Nanoprestige for the first time. Makes Nanoprestiges boost production.": "第一次纳米声望。 使 纳米声望 提高产量。",
    "Microprestiges": "微声望",
    "1 Partialprestige. Unlocks a buyable for Miniprestige, and a few upgrades.": "1个部分。解锁可购买的微型春季，并进行一些升级。",
    "Buy, buy again": "购买，再次购买",
    "Complete Muckraking 3 times.": "完成3次。",
    "Complete Muckraking for the first time.": "第一次完成混乱。",
    "Complete Nanofuse.": "完整的纳米。",
    "Currently:": "目前：",
    "Dynamic Upgraing": "动态升级",
    "Get 2 Miniprestiges. Multiplies point gain by 49, divides Microprestige requirement by 2, and adds new upgrades.": "获得2个小型声望。将点数增益乘以49，将 微型声望 要求除以2，并增加了新的升级。",
    "Get 3 Miniprestiges. You now keep Micro upgrades on Miniprestige.": "获得 3 迷你声望。现在可以在 迷你声望 时 保留微型升级。",
    "Get 6 Microprestiges. Microprestige no longer resets Nanoprestige upgrades.": "获取 6 微型声望。 微型声望不再重置纳米声望的升级。",
    "Gilded Age": "镀金时代",
    "Micro upgrade 14. Shows Buyable menu on Microprestige.": "微型升级14.在 微型声望 显示可购买的菜单。",
    "Micromint": "微型标",
    "Micropoint": "微型点数",
    "Micropush": "微型促进",
    "Mini upgrade 13. Unlocks BN upgrades 12, 13, 14, 15": "迷你升级13.解锁BN升级12、13、14、15",
    "Miniprestige for the first time. Unlocks the Upgrade subtab on all layers.": "第一次微型声望。解锁所有层上的升级子选项卡。",
    "Miniprestiges": "微型声望",
    "Nano upgrade 13. Shows Buyable menu on Nanoprestige.": "纳米升级13. 在 纳米声望 显示可购买的菜单。",
    "Nano upgrade 44. Shows Challenge menu on Nanoprestige.": "纳米升级44.在 纳米声望 显示挑战菜单。",
    "Nanoclick": "纳米点击",
    "Nanopoint": "纳米点数",
    "Nanoprestige cost divided by Nanoprestige's effect.": "纳米声望 成本除以 纳米声望 的效果。",
    "Nanoprestige cost is divided by 3.": "纳米声望成本除以3。",
    "Nanopush": "纳米促进",
    "Nanoshove": "纳米推进",
    "Point gain is multiplied by 7.": "点数增益乘以7。",
    "Prefacing conclusions": "预定结论",
    "Purchase BUYABLE ENLARGEMENT. Unlocks 1 buyable in Nano, Micro, and Broken Nano, Mini, and Small. Also unlocks Microfinale.": "购买可购买的扩大。解锁 1 可购买 在纳米，微型和破碎的纳米，迷你和小型中可购买。也解锁了缩影。",
    "Purchase MICRO ENLARGEMENT. Unlocks Micro upgrades 61, 62, 63, 64, and 65.": "购买微型放大。解锁微型升级61、62、63、64和65。",
    "Purchase MINI ENLARGEMENT. Unlocks Mini upgrades 31, 32, 33, and 34.": "购买迷你放大。解锁迷你升级31、32、33和34。",
    "Purchase NANO ENLARGEMENT. Unlocks Nano upgrades 91, 92, 93, 94, and 95.": "购买纳米放大。解锁Nano升级91、92、93、94和95。",
    "Purchase Nanopierce at least once.": "至少购买一次纳米副手。",
    "Purchase SMALL ENLARGEMENT. Unlocks Small upgrades 11, 12, 13, 14, and 15.": "购买小型放大。解锁小型升级11、12、13、14和15。",
    "Purchase Smallprestige upgrade 11. Unlocks the Small Force minigame.": "购买小型声望升级11.解锁小型迷你游戏。",
    "Put in the effort": "努力",
    "Stacked": "堆叠",
    "Stacked II": "堆叠II",
    "To begin (for real this time)": "开始（这次真实）",
    "Triple Threat": "三重威胁",
    "Unlock 2 buyables.": "解锁2个可买到。",
    "Unlockers": "解锁者",
    "Unlocks:": "解锁：",
    "Upgrades": "升级",
    "Buyables": "可购买",
    "Buyables do not do anything.": "购买物品什么也没做。",
    "Challenges": "挑战",
    "Microagression": "微型侵略",
    "Microgesture": "微型手势",
    "Microprestiges give a bigger boost to point gain, and increase the base of Nanobuff.": "微型声望给予一个更大的提升到点数增益，并提高纳米Buff的基数。",
    "Microstrawman": "微型稻草人",
    "Miniprestiges give a bigger boost to point gain, and unlock new Nanoprestige upgrades.": "迷你声望给予一个更大的提升到点数增益，并且解锁新的纳米声望升级。",
    "Muckraking": "疯狂",
    "Nanoblock": "纳米块",
    "Nanobuff": "纳米Buff",
    "Nanogains": "纳米增益",
    "Nanomuscle": "纳米肌肉",
    "Nanopierce": "纳米穿刺",
    "Raises Point gain to ^1.1, and increases the power of Nanoprestiges.": "将点数增益提高到 ^1.1，并增加纳米声望的能力。",
    "Reward:": "奖励：",
    "The first row of buyables has increased power. You keep Challenges on Micro resets.": "第一行可购买的功率增加。 您在微型重置时保留挑战。",
    "Unlock a new set of Nano upgrades, and Nanoprestige effect increased ^2": "解锁一组新的纳米升级，纳米声望效应增加了 ^2",
    "Increases the power of Nanoprestiges again.": "再次增加纳米声望的能力。",
    "Automatically buy Nanoprestiges.": "自动购买纳米声望。",
    "Buyables no longer cost anything, and unlock a new one": "可购买的不再花费任何东西，并解锁新产品",
    "Divide buyable requirement by 2, and buyables no longer reset on Microprestige": "将可购买的需求除以2，而可购买的不再重置微型声望",
    "Divide Microprestige requirement by 2, and multiply point gain by 7.": "将微孔需求除以2，将点增益乘以7。",
    "Increase the effect of Nanomuscle by 0.00": "将纳米肌肉的作用增加0.00",
    "Nanobuy": "纳米购买",
    "Nanocharge": "纳米充电",
    "Nanodecharge": "纳米反技术",
    "Nanohate": "纳米厌恶",
    "NanoI": "纳米1",
    "NanoII": "纳米2",
    "NanoIII": "纳米3",
    "NanoIV": "纳米4",
    "Nanolove": "纳米爱爱",
    "Nanonull": "纳米空值",
    "Nanorecharge": "纳米重填",
    "Nanosell": "纳米出售",
    "Reduce the ^1.2 in Nanobuff's cost formula to a ^1.1.": "将纳米Buff的成本公式中的 ^1.2减少到 ^1.1。",
    "Square the Nanoprestige formula again.": "再次将纳米声望公式齐平。",
    "Unlock 2 Nanoprestige challenges": "解锁2个纳米声望挑战",
    "Unlock a Nanoprestige buyable, and you can buy max Nanoprestiges.": "解锁一个纳米声望可购买，您可以购买最大纳米声望。",
    "Unlock another Nanoprestige buyable.": "解锁另一个可购买的纳米质子。",
    "Multiply the power of Nanogains based on this challenge's completions.": "根据此挑战的完成，将纳米群的能力倍增。",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    // 图标代码，不能汉化
    "Jacorb's Games": "Jacorb's Games",
    "Current endgame at 25 Smallprestiges!": "当前残局为 25 小型声望！",
    "AC": "AC",
    "N": "N",
    "i": "i",
    "μ": "μ",
    "M": "M",
    "UC": "UC",
    "": "",
    "": "",
    "": "",
    "": "",
    "v0.4.0c Beta": "v0.4.0c Beta",
    "By Jacorb90": "By Jacorb90",
    "content_copy": "content_copy",
    "library_books": "library_books",
    "discord": "discord",
    "drag_handle": "drag_handle",
    "edit": "edit",
    "forum": "forum",
    "content_paste": "content_paste",
    "delete": "delete",
    "info": "info",
    "settings": "settings",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    'Git游戏': 'Git游戏',
    'QQ群号': 'QQ群号',
    'x': 'x',
    'QQ群号:': 'QQ群号:',
    '* 启用后台游戏': '* 启用后台游戏',
    '更多同类游戏:': '更多同类游戏:',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "\n": "\n",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Shift-Click to Toggle Tooltips: ": "Shift-单击以切换工具提示：",
    "which are multiplying Point gain by ": "乘以点数增益 ",
    "BN upgrades ": "BN 升级 ",
    "μ upgrades ": "μ 升级 ",
    "N upgrades ": "N 升级 ",
    "M upgrades ": "M 升级 ",
    "BN upgrades ": "BN 升级 ",
    "u upgrades ": "u 升级 ",
    "Cost formula: ": "成本公式：",
    "Levels: ": "等级：",
    "Formula: ": "公式：",
    "Effect: ": "效果：",
    "N upgrades ": "N 升级 ",
    "μ upgrades ": "μ 升级 ",
    "M upgrades ": "M 升级 ",
    "Multiply Point gain by ": "乘以点数增益 ",
    "Point gain is raised to ": "点数增益提高到 ",
    "Divide buyable and Microprestige requirements by ": "将可购买的和微型声望的要求除以 ",
    "Increase the effect of Nanomuscle by ": "将纳米肌肉的作用提高 ",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "  ",
    " ": " ",
    "\n": "\n",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)\-([\d\.]+)\-([\d\.]+)$/,
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^\(([\d\.]+)\)$/,
    /^\(([\d\.]+)\)$/,
    /^([\d\.]+)\%$/,
    /^([\d\.]+)\/([\d\.]+)$/,
    /^\(([\d\.]+)\/([\d\.]+)\)$/,
    /^成本(.+)$/,
    /^\(([\d\.]+)\%\)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)K$/,
    /^([\d\.]+)M$/,
    /^([\d\.]+)B$/,
    /^([\d\.]+) K$/,
    /^([\d\.]+) M$/,
    /^([\d\.]+) B$/,
    /^([\d\.]+)s$/,
    /^([\d\.]+)x$/,
    /^x([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^\+([\d\.,]+)$/,
    /^\-([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^([\d\.,]+) \/ ([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^\/([\d\.]+)e([\d\.,]+)$/,
    /^e([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^You have (.+) Microprestiges$/, '你有 $1 微声望'],
    [/^You have (.+) Miniprestige$/, '你有 $1 迷你声望'],
    [/^You have (.+) Smallprestige$/, '你有 $1 小型声望'],
    [/^You have (.+) Nanoprestiges$/, '你有 $1 纳米声望'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
    [/^Reach (.+) Microprestiges to unlock \(You have (.+) Microprestiges\)$/, '达到 $1 微声望解锁（你有 $2 微声望）'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^\(([\d\.]+)\/sec\)$/, '\($1\/秒\)'],
	[/^\(([\d\.]+)e([\d\.,]+)\/sec\)$/, '\($1e$2\/秒\)'],
	[/^\(([\d\.]+) OOMs\/sec\)$/, '\($1 OOMs\/秒\)'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^([\d\.]+) elves$/, '$1 精灵'],
    [/^([\d\.]+)d ([\d\.]+)h ([\d\.]+)m$/, '$1天 $2小时 $3分'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^x([\d\.]+)e([\d\.,]+) to points$/, 'x$1e$2 到点数'],
    [/^x([\d\.]+) to points$/, 'x$1 到点数'],
    [/^([\d\.]+)e([\d\.,]+) \/ ([\d\.]+)e([\d\.,]+) points$/, '$1e$2 \/ $3e$4 点数'],
    [/^([\d\.,]+) \/ ([\d\.]+)e([\d\.,]+) points$/, '$1 \/ $2e$3 点数'],
    [/^([\d\.,]+) \/ ([\d\.,]+) points$/, '$1 \/ $2 点数'],
    [/^([\d\.,]+) Nanoprestige Fragments$/, '$1 纳米声望碎片'],
    [/^([\d\.,]+) Smallprestige$/, '$1 小型声望'],
    [/^([\d\.,]+) Smallprestiges$/, '$1 小型声望'],
    [/^([\d\.,]+) Microprestige$/, '$1 微型声望'],
    [/^([\d\.,]+) Microprestiges$/, '$1 微型声望'],
    [/^([\d\.,]+) miniprestige$/, '$1 迷你声望'],
    [/^([\d\.,]+) Miniprestige$/, '$1 迷你声望'],
    [/^([\d\.,]+) Miniprestiges$/, '$1 迷你声望'],
    [/^([\d\.,]+) Nanoprestige$/, '$1 纳米声望'],
    [/^([\d\.,]+) Nanoprestiges$/, '$1 纳米声望'],
    [/^([\d\.,]+) Communals. Unlocks:$/, '$1 公共. 解锁:'],
    [/^([\d\.,]+) Smallprestige. Unlocks:$/, '$1 小型声望. 解锁:'],
    [/^([\d\.,]+) elves$/, '$1 精灵'],
    [/^u upgrade ([\d\.,]+)$/, 'u 升级 $1'],
    [/^N upgrade ([\d\.,]+)$/, 'N 升级 $1'],
    [/^M upgrade ([\d\.,]+)$/, 'M 升级 $1'],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^Cost: (.+) Nanoprestiges.$/, '成本：$1 纳米声望。'],
    [/^Cost: (.+) Nanoprestiges$/, '成本：$1 纳米声望'],
    [/^Cost: (.+) Microprestiges$/, '成本：$1 微声望'],
    [/^Cost: (.+) Smallprestige$/, '成本：$1 小声望'],
    [/^Cost: (.+) Miniprestige$/, '成本：$1 迷你声望'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Req: (.+) points$/, '要求：$1 点数'],
    [/^Req: (.+) elves$/, '要求：$1 精灵'],
    [/^Req: (.+) \/ (.+) Microprestiges$/, '要求：$1 \/ $2 微型声望'],
    [/^Req: (.+) \/ (.+) Smallprestige$/, '要求：$1 \/ $2 小型声望'],
    [/^Req: (.+) \/ (.+) Miniprestige$/, '要求：$1 \/ $2 迷你声望'],
    [/^Req: (.+) \/ (.+) Nanoprestiges$/, '要求：$1 \/ $2 纳米声望'],
    [/^Req: (.+) \/ (.+) points$/, '要求：$1 \/ $2 点数'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);