<?php

namespace debugger;

class instance
{
	const LEVEL_LOG = 'log';
	const LEVEL_INFO = 'info';
	const LEVEL_ERROR = 'error';
	const LEVEL_WARNING = 'warn';

	protected $label = 'Debugger';
	protected $queue = [];

	public function __construct($label = null)
	{
		ob_start();
		if (!is_null($label)) {
			$this->label = $label;
		}
	}

	public function __destruct()
	{
		$buffer = ob_get_clean();
		foreach ($this->queue as $message) {
			header("Debugger|{$message['id']}: " . json_encode($message));
		}
		echo $buffer;
	}

	protected function add($message, $level)
	{
		$id = uniqid();

		$this->queue[$id] = [
			'id' => $id,
			'level' => $level,
			'label' => $this->label,
			'time' => microtime(true),
			'information' => $message,
		];

		return $id;
	}

	public function log($message)
	{
		return $this->add($message, static::LEVEL_LOG);
	}

	public function info($message)
	{
		return $this->add($message, static::LEVEL_INFO);
	}

	public function error($message)
	{
		return $this->add($message, static::LEVEL_ERROR);
	}

	public function warning($message)
	{
		return $this->add($message, static::LEVEL_WARNING);
	}

	public function remove($id)
	{
		if (!isset($this->queue[$id])) {
			return false;
		}
		unset($this->queue[$id]);
		return true;
	}

	public function clean()
	{
		$count = count($this->queue);
		$this->queue = [];
		return $count;
	}
}
