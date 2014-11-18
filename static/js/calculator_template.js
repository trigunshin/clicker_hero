<div>
    <textarea id="savedata" onfocus="this.select()" onmouseup="return false"></textarea>
    <input type="button" value="Import" onclick="Import()"></input>
    <label><input type="checkbox" id="addsouls" checked="checked"></input>Include souls gained after ascension</label>
    <div>
        <label><input type="checkbox" id="idlemode" checked="checked"></input>Idle mode (no clicks/abilities)</label>
        <div id="nonidle" style="display: none">
            <table border="0">
                <tr><th>Cooldown usage:</th><th>Uses/30 min</th><th>Clicks/sec</th></tr>
                <tr>
                    <td>Full (1+2+3+4+5+7):</td>
                   <td><input type="text" id="cdfullnum" value="2"></input></td>
                   <td><input type="text" id="cdfullcps" value="40"></input></td>
                </tr>
                <tr>
                    <td>Half (1+2+3+4):</td>
                    <td><input type="text" id="cdhalfnum" value="1"></input></td>
                    <td><input type="text" id="cdhalfcps" value="40"></input></td>
                </tr>
                <tr>
                    <td>Short (1+2):</td>
                    <td><input type="text" id="cdshortnum" value="4"></input></td>
                    <td><input type="text" id="cdshortcps" value="40"></input></td>
                </tr>
                <tr>
                    <td>None:</td>
                    <td></td>
                    <td><input type="text" id="cdnonecps" value="40"></input></td>
                </tr>
            </table>
        </div>
        Relevant gild level (for Argaiv): <input type="text" id="gildlevel" value="0" style="width: 100px"></input>
    </div>
    <div>
        Leave current level blank or 0 if you don't own the ancient.
        <table id="herotbl" border="0" cellspacing="0">
            <tr><th>Ancient</th><th>Current</th><th>Target</th></tr>
            <tr>
                <td>Hero Souls</td>
                <td><input type="text" id="soulsin" value="0"></input></td>
                <td><input type="text" id="soulsout" readonly="readonly" tabindex="-1"></input></td>
            </tr>
        </table>
        <input type="button" value="Update" onclick="Compute()"></input>
        <label><input type="checkbox" id="suggestbuy" checked="checked"></input>Suggest additional ancients to purchase (can be slow if the number of souls is very high)</label>
    </div>
    <div id="output">
    </div>
</div>